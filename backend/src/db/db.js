import mongoose from 'mongoose';
import dotenv from "dotenv";

dotenv.config();


const connectDB = async() =>{
    try {

        let res = await mongoose.connect(process.env.MONOG_URL)

        if(res){
            console.log("mongooDB connented");
        }
        
    } catch (error) {
        console.log("data base error",error);
    }
}

export default connectDB;