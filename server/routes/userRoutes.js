import express from "express";
import { createUser, logIn } from "../controllers/userControllers.js";

const router = express.Router();

router.post('/createUser', createUser);
router.post('/login', logIn);

export default router