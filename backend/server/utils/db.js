const mongoose = require("mongoose")

const URI = process.env.MONGODB_URI;

const connectDB = async () => {
    try {
        await mongoose.connect(URI)    
        console.log("MongoDB Connected...");
        
    } catch (err) {
        console.error(err.message, "Failed");
        process.exit(0)
    }
}


module.exports = connectDB; 
