import isEmail from "validator/lib/isEmail.js";
import prisma from "../DB/db.config.js";

export const getInfo = async (req, res) => {
    try {
        const userId = req.user.id;
        const userRole = req.user.role;
        if(userRole !== "STORE_OWNER"){
            return res.status(403).json({ message: "Access denied" });
        }
        const stoerdetails = await prisma.store.findFirst({
            where:{
                owner: {
                    id: Number(userId)  // filter by the related user's id
                }
            },
            select:{
                name: true,
                email: true,
                address:true,
                overallRate:true,
                ratings: {
                    select: {       // 👈 use select, not include
                        rating: true, 
                        user: {
                            select: { id: true, name: true, email: true }
                        }
                    }
                }
            }
        })
        if(!stoerdetails){
            return res.status(404).json({ message: "store not found." });
        }
        res.status(201).json(stoerdetails);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}