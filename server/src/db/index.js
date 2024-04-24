import mongoose from "mongoose";

const connectDB = async () => {
    try{
        const url=process.env.MONGODB_URI+"/auctionDB";
        console.log("MONGO_URI",url);
        const connectionInstance =await mongoose.connect(url)
        console.log("HOST: "+connectionInstance.connection.host);
    }catch(err){
        console.log("MONGOB CONNECTION FAILED ",err);
        process.exit(1);
    }
}

export default connectDB;