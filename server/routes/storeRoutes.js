import express from "express"
import { auth } from "../middleware/auth.js";
import { getInfo } from "../controllers/storeControllers.js";

const router = express.Router();

router.get('/storeinfo', auth, getInfo);

export default router;