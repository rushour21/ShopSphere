import express from "express";
import { signUp, logIn,logout } from "../controllers/authControllers.js";

const router = express.Router();

router.post('/Signup', signUp);
router.post('/login', logIn);
router.post('/logout', logout);


export default router