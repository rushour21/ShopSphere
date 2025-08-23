import prisma from "../DB/db.config.js";
import bcrypt from "bcrypt"
import validator from 'validator'
import { validatePassword } from "../utils/validation.js";

export const getstore = async (req, res) =>{
    try {
        const userRole = req.user.role;
        const userId = req.user.id
        console.log(userRole)
        if(userRole !== "USER"){
            return res.status(403).json({ message: "Access denied" });
        }
         const stores = await prisma.store.findMany({
            include: {
                ratings: userId
                ? { where: { userId }, select: { rating: true } }
                : false
            }
        });
        const response = stores.map(store => ({
            ...store,
            userRating: store.ratings?.[0]?.rating || null
        }));

        res.status(201).json(response);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateRating = async (req, res)=>{
    try {
        const userRole = req.user.role;
        const {rating} = req.body;
        const userId = req.user.id;
        const {storeId} = req.params;
        const storeIdNum = Number(storeId);
        console.log(userRole)
        if(userRole !== "USER"){
            return res.status(403).json({ message: "Access denied" });
        }
        await prisma.rating.upsert({
             where: {
                userId_storeId: { userId, storeId: storeIdNum }
            },
            update: { rating },
            create: { rating, userId, storeId: storeIdNum }
        });

        const avg = await prisma.rating.aggregate({
            where:{storeId: storeIdNum},
            _avg:{rating:true}
        })

        await prisma.store.update({
            where:{id: storeIdNum},
            data:{overallRate:avg._avg.rating || 0 }
        });
        res.status(200).json({ message: "Rating saved successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const updatePassword = async (req, res) => {
  try {
    validatePassword(req);
    const userId = req.user.id;
    const { currentPassword, newPassword } = req.body;

    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid current password." });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword }
    });

    res.status(200).json({ message: "Password updated successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
