import prisma from "../DB/db.config.js";
import JWT from "jsonwebtoken"

export const auth = async(req, res, next)=>{
    try {
        console.log(req.cookies)
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: 'Authentication required.' });
        }
        const decoded = JWT.verify(token, process.env.JWT_SECRET);
        const user = await prisma.user.findUnique({
            where:{
                id:decoded.id
            },select:{
                id: true,
                name: true,
                address: true,
                email: true
            }
        })
        
        if (!user) {
        return res.status(401).json({ message: "User not found." });
        }
        req.user= user;
        next();
    } catch (error) {
        console.error("Auth error:", error.message);
        return res.status(401).json({ message: "Invalid or expired token." });
    }
}
