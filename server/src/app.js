import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app=express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
//import routes
import userRoute from "./routes/user.route.js";
import productRoute from "./routes/product.route.js";

//use routes
app.use("/api/v1/user",userRoute);
app.use("/api/v1/product",productRoute);

export {app}
