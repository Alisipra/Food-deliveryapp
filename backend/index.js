import express from 'express';
import bodyParser from "express";
import Cors from "cors"
import userRouter from "./routes/user.js"
import dataUser from "./routes/data.js"
import connectDB from './db.js';
import dotenv from "dotenv";
dotenv.config();
const app=express();
connectDB();
app.use(express.json());
// cors configuration
const corsOptions={
    origin: process.env.FRONTEND_URL,
    methods:["POST","GET","PUT","DELETE"],
    allowedHeaders:["Content-Type","Authorization"],
    // credentials:"true"
}
app.use(Cors(corsOptions));
app.use(bodyParser.json());

///userRouter
app.use("/",userRouter);

///dataRouter

app.use("/",dataUser);

const port=3000;
app.listen(port,'0.0.0.0',()=>{
    console.log("Server is up...",port)
})
