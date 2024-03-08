import mongoose from "mongoose";

export async function connect(){
    try {
        mongoose.connect(process.env.MONGODB_URL!)
        const connection = mongoose.connection;
        connection.on("connected",()=>{
            console.log("MongoDb connected")
        })
        
    } catch (error) {
        console.error("Failed to connect to database",error)
        process.exit();
    }
}

