
///Fetch data from Mongodb

import { Order } from "../models/Order.js"

export const fetchingData=((req,res)=>{
    try {
        res.send([global.foodData,global.categoryData])
    } catch (error) {

        res.json({message:"Data Could Not fetched..."})
        
    }
})


///order data


 export const orderdata=(async (req, res) => {
    

    // Ensure the required fields are present in the request body
    const { order_data, email, order_date } = req.body;

    // Validate if order_data is an array
    if (!Array.isArray(order_data) || order_data.length === 0) {
        return res.status(400).json({ success: false, message: "Invalid or missing order_data" });
    }

    // Validate if email is provided
    if (!email) {
        return res.status(400).json({ success: false, message: "Email is required" });
    }

    // Validate if order_date is provided
    if (!order_date) {
        return res.status(400).json({ success: false, message: "Order date is required" });
    }

    // Insert the order_date into the first item of the order_data array
    order_data.unshift({
        Order_date: order_date
    });

    try {
        
        let existingOrder = await Order.findOne({ email: req.body.email });

    if (existingOrder) {
        // Append new order data to the existing order
        existingOrder.order_data.push(...order_data); // Assuming order_data is an array
        await existingOrder.save();

        return res.status(200).json({ success: true, message: "Order updated successfully!", order: existingOrder });
    }else{
        await Order.create({
            email: req.body.email,
            order_data: order_data,
            order_date: order_date
        });

        res.json({ success: true, message: "Order placed successfully!" });
    }
        // Create a new order if no existing order is found
        
    } catch (error) {
        console.error("Database Insertion Error:", error);
        res.status(500).json({ success: false, message: "Database error occurred" });
    }
})

////myorderdata

export const myorderdata=( async (req, res) => {
    try {
        let myorderdata = await Order.findOne({ "email": req.body.email });

        if (!myorderdata) {
            return res.status(404).json({ error: "No orders found" });
        }

        res.json({ data: { myorderdata } }); // Wrap in 'data' to match frontend expectations
    } catch (error) {
        console.error("Server Error:", error.message);
        res.status(500).json({ error: "Server error" });
    }
})