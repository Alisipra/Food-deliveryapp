import jwt from "jsonwebtoken"
import { User } from "../models/user"

export const authenticate= async (req,res,next)=>{
    const token =req.header("auth")
    if(!token) return res.status(400).json({message:"Login first..."})
    const decoded=jwt.verify(token,"secure")    
    const id=decoded.userToken;

    let user =await User.findById(id)
    if(!user) return res.json({message:"user not found"})
    req.user

    
    console.log("im token",token)
    next();





}

