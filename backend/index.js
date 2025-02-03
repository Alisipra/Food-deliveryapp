import express from 'express';
import bodyParser from "express";
import Cors from "cors"
import userRouter from "./routes/user.js"
import dataUser from "./routes/data.js"
import connectDB from './db.js';

const app=express();
connectDB();
app.use(express.json());
app.use(Cors({
    origin: 'http://localhost:5173',
    methods:["POST","GET","PUT","DELETE"],
    credentials:"true"
}))
app.use(bodyParser.json());

///userRouter
app.use("/",userRouter);

///dataRouter

app.use("/",dataUser);


app.listen(1000,'0.0.0.0',()=>{
    console.log("Server is up...")
})
