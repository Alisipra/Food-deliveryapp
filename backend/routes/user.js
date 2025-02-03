import express from "express"
import { LoginUser, registerUser } from "../controllers/user.js";
const router=express.Router();

///user Register

router.post('/signup',registerUser)

///Login user
router.post('/login',LoginUser)


export default router;
