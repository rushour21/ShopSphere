import express from "express"
import { dashboardContent, storeList, userList } from "../controllers/systemDashboard.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.get('/dashboard', auth,dashboardContent);
router.get('/dashboard/storelist',auth, storeList);
router.get('/dashboard/userlist',auth, userList);

export default router