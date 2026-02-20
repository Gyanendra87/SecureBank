const mongoose=require('mongoose');


const connectiondb=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Database connected successfully");
        
    } catch (error) {
        console.log("Error connecting to database",error);
        
    }
}

module.exports=connectiondb;