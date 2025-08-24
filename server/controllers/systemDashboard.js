import prisma from "../DB/db.config.js";

export const dashboardContent = async (req, res) =>{
    try {
        const userRole = req.user.role;
        if(userRole !== "SYSTEM_ADMIN"){
            return res.status(403).json({ message: "Access denied" });
        }
        const [totalUsers, totalStores, totalRatings] = await Promise.all([
            prisma.user.count(),
            prisma.store.count(),
            prisma.rating.count()
        ]);

        res.status(200).json({
            message: "Data fetched successfully",
            data: { totalUsers, totalStores, totalRatings }
        });
    } catch (error) {
         res.status(400).json({
            message: error.message
        })
    }
}

export const storeList = async (req, res)=>{
    try {
        const userRole = req.user.role;
        if(userRole !== "SYSTEM_ADMIN"){
            return res.status(403).json({ message: "Access denied" });
        }
        const stores = await prisma.store.findMany({
            select:{
                id:true,
                name: true,
                email: true,
                address: true,
                overallRate: true
        }})
        res.status(200).json({
            message: "stores fetched successfully",
            data: stores
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

export const userList = async (req, res) =>{
    try {
        const userRole = req.user.role;
        if(userRole !== "SYSTEM_ADMIN"){
            return res.status(403).json({ message: "Access denied" });
        }
        const users = await prisma.user.findMany({
            select:{
                name: true,
                email: true,
                address: true,
                role:true,
                store:{
                    select:{
                        overallRate: true
                    }
                }
            }
        })
        res.status(200).json({
            message: "Users fetched successfully",
            data: users
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}