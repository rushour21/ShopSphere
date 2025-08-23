import express from "express";
import { getstore, updatePassword, updateRating } from "../controllers/userControler.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.get('/getstores',auth, getstore);
router.post('/addrating/:storeId',auth, updateRating);
router.patch('/updatepassword',auth, updatePassword);

export default router