import mongoose, { Schema } from "mongoose"


const OrderSchema=new Schema({
    email: { type: String, required: true },
    order_data: { type: Array, required: true },
    order_date: { type: String, required: true },

})

export const Order=mongoose.model("orderData",OrderSchema)