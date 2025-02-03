import mongoose from 'mongoose';
import 'dotenv/config';
const URI = process.env.MONGODB_URI;

const connectDB = async () => {
    try {
        await mongoose.connect(URI);
        console.log("MONGODB is connected with Express");
        const db = mongoose.connection.db;
        const foodCollection = db.collection("foodData");
        const catCollection = db.collection("foodCategory");

        const food = await foodCollection.find({}).toArray();
        const category = await catCollection.find({}).toArray();
           if(!food || !category){
            console.log("Can not fetch data")
        }
           else{
            global.foodData=food;
            global.categoryData=category;
         }

    } catch (error) {
        console.error("MongoDB connection error:", error);
    }
};
///conect to db


export default connectDB;