import express from "express"
import { fetchingData, myorderdata, orderdata } from "../controllers/Data.js";


const router=express.Router()

///fetch data 

router.post("/fetchdata",fetchingData)

///order data

router.post('/orderdata',orderdata)

///my order data

router.post("/myorderdata",myorderdata)





export default router;