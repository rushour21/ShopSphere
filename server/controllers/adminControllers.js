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
    if (userRole !== "SYSTEM_ADMIN") {
      return res.status(403).json({ message: "Access denied" });
    }

    const { name, email, address, ownerId } = req.body;
    if (!name || !email || !address || !ownerId) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // check if user already owns a store
    const isownedStore = await prisma.store.findFirst({
      where: {
        owner: {
          id: ownerId
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
          connect: { id: ownerId }
        }
      }
    });

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
