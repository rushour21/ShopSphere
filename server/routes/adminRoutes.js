import express from "express"
import { auth } from "../middleware/auth.js";
import { createStore, createUser } from "../controllers/adminControllers.js";

const router = express.Router();

router.post('/createuser', auth, createUser);
router.post('/cretestore', auth, createStore);

export default router