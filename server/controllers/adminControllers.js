import prisma from "../DB/db.config.js";
import bcrypt from "bcrypt"
import JWT from "jsonwebtoken"

export const createUser = async (req, res)=>{
    try {
        const userRole = req.user.role;
        console.log(userRole)
        if(userRole !== "SYSTEM_ADMIN"){
            return res.status(403).json({ message: "Access denied" });
        }
        const {name, email, address, password, role} = req.body;
        if(!name || !email || !address || !password || !role){
            return res.json({status:400, message:"All fields are required"});
        }
        const existingUser = await prisma.user.findUnique({
                where: { email }
            });
        if(existingUser){
            return res.json({status:400, message:"User Already Exist"});
        }
        
        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = await prisma.user.create({
            data:{
                name,
                email, 
                address,
                password : hashPassword,
                role
            }
        })
        if(newUser){
            res.status(201).json({
            message: 'User created successfully',
            user: {
                name: newUser.name, 
                email: newUser.email
            },
        })
        }
    } catch (error) {
         res.status(400).json({
            message: error.message
        })
    }
}

export const createStore = async (req, res) => {
  try {
    const userRole = req.user.role;
    console.log(req.body)
    if (userRole !== "SYSTEM_ADMIN") {
      return res.status(403).json({ message: "Access denied" });
    }

    const { name, email, address, ownerId } = req.body;
    if (!name || !email || !address || !ownerId) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const ownerIdInt = Number(ownerId);
    // check if user already owns a store
    const isownedStore = await prisma.store.findFirst({
      where: {
        owner: {
          id: ownerIdInt
        }
      }
    });

    if (isownedStore) {
      return res.status(400).json({ message: "User already owns a store" });
    }

    const newStore = await prisma.store.create({
      data: {
        name,
        email,
        address,
        owner: {
          connect: { id: ownerIdInt }
        }
      }
    });

    await prisma.user.update({
      where:{id:ownerIdInt},
      data:{
        role:"STORE_OWNER"
      }
    })

    res.status(201).json({
      message: "Store created successfully",
      newStore
    });
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
};

export const usersToassign = async (req,res) =>{
  try {
    const userRole = req.user.role;
    if (userRole !== "SYSTEM_ADMIN") {
      return res.status(403).json({ message: "Access denied" });
    }
    const getusers = await prisma.user.findMany({
      where:{
        role:"STORE_OWNER",
        storeId: null,
      },
      select:{
        id:true,
        name:true
      }
    })
    res.status(200).json({getusers});
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
}