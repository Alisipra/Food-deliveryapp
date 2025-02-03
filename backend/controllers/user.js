import { User } from "../models/user.js";
import bcrypt from "bcryptjs"
import { check,validationResult } from 'express-validator';
import jwt from "jsonwebtoken"
// register a new user
export const registerUser=([
    // username must be an email
  check('email').isEmail(),
  // password must be at least 5 chars long
  check('password').isLength({ min: 5 })
],async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({message:"Invalid credentials"});
    }
  

    const {name,email,password,location}=req.body;
    let checkUser=await User.findOne({email});
    if(checkUser){
       return res.status(400).json({message:"User Does not Exists...."})
    }
    else{
        let salt = await bcrypt.genSalt(10);
        let securePwd=await bcrypt.hash(password,salt);
        let user=await User.create({
            name,email,password:securePwd,location
        })
    res.json({message:"Signup Successfully....",user})
    }
    
}   )


///Login User

export const LoginUser=(async(req,res)=>{
    const {email,password}=req.body;
    let signIn=await User.findOne({email});
    
    if(!signIn){
        return res.status(400).json({ message:"user not exists..." });
    }
    let compare=await bcrypt.compare(password,signIn.password)
    if(!compare){
        return res.status(400).json({message:"Invalid Credentials..."})
        
    }
    else{
        const token=await jwt.sign({userToken:signIn._id},process.env.SECRET,{expiresIn:"1d"});
        res.json({message:"Login successfully...",token})
    }
    
})