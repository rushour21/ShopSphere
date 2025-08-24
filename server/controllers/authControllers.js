import prisma from "../DB/db.config.js";
import { validateSignUp } from "../utils/validation.js"
import bcrypt from "bcrypt"
import JWT from "jsonwebtoken"

export const signUp = async (req, res) =>{
    try {
        console.log(req.body)
        validateSignUp(req);
        const {name, email, address, password} = req.body;
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
                password : hashPassword
            }
        })  
        const token =  JWT.sign(
            { id: newUser.id, email: newUser.email, role: newUser.role },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );
        res.cookie('token', token, {
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
        })
        res.status(201).json({
            message: 'User created successfully',
            user: {
                name: newUser.name, 
                email: newUser.email,
                address: newUser.address
            },
        })
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

export const logIn = async (req, res) =>{
    const {email, password} = req.body;
    try {
        const user = await prisma.user.findUnique({
            where:{
                email
            }
        });
        console.log( user.email)
        if(!user){
            return res.status(400).json({
                message: "Invalid credentials.",
            })
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(isMatch){
            const token =  JWT.sign(
                { id: user.id, email: user.email, role: user.role },
                process.env.JWT_SECRET,
                { expiresIn: "7d" }
            );

            res.cookie('token', token, {
                expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
            })
            res.status(201).json({
                message: 'User logged in successfully',
                user: {
                    name: user.name, 
                    email: user.email,
                    address: user.address,
                    role: user.role
                },
            })
        }else{
            res.status(400).json({
                message: "Invalid credentials.",
            })
        }
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

export const logout= async (req, res)=>{
    res.cookie('token', null, {
        expires: new Date(Date.now()),
    })
     res.status(200).json({
        message: "Logout successful"
    })
}