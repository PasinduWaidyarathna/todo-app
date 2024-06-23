import mongoose from "mongoose";

const connectMongoDB = async() => {
    try{
        await mongoose.connect(process.env.MONGODB_URI as string)
        console.log("MongoDB connected successfully")   
    }catch(error){
        console.log(error)
    }
};

export default connectMongoDB;