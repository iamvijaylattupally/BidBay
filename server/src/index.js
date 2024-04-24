import {app} from "./app.js";
import dotenv from "dotenv";
import connectDB from "./db/index.js" ;
dotenv.config(
    {
        path: './.env'
    }
);

connectDB().then(()=>{
    app.listen(process.env.PORT||3030,()=>{
        console.log(`Server is running on PORT ${process.env.PORT}`);
    });
}).catch((err)=>{
    console.log("Server failed to start",err);
});