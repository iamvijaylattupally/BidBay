import mongoose from "mongoose";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import {createToken} from "../utils/JWT.js";

const registerUser = async(req,res)=>{
    try{
        const {email,phonenumber,password,name} = req.body;
        if(!email || !phonenumber || !password || !name){
            console.log("PLEASE FILL ALL THE FIELDS");
            res.status(400).json({message:"PLEASE FILL ALL THE FIELDS"});
        }else{
            bcrypt.hash(password,10,async(err,hash)=>{
                if(err){
                    console.log("ERROR IN HASHING PASSWORD : ",err);
                    res.status(400).json({message:"ERROR IN HASHING PASSWORD"});
                }else{
                    const existingUser = await User.findOne({
                        $or: [
                            { email: email },
                            { phonenumber: phonenumber }
                        ]
                    });
                    if(existingUser){
                        console.log("USER ALREADY EXISTS WITH THIS EMAIL OR PHONENUMBER");
                        res.status(400).json({message:"USER ALREADY EXISTS WITH THIS EMAIL OR PHONENUMBER"});
                    }else{
                        const user = new User({email:email , phonenumber:phonenumber , password:hash , name:name});
                        await user.save();
                        const createdUser = await User.findOne(user._id).select("-password -refreshToken");
                        if(!createdUser){
                            console.log("ERROR IN REGISTERING USER");
                            res.status(400).json({message:"ERROR IN REGISTERING USER"});
                        }else{
                            const accessToken = createToken({ email: email ,password:hash});
                            console.log("user registered successfully");
                            res.status(200).json({message:"user registered successfully",user:createdUser,accessToken:accessToken});
                        }
                    }
                }
            })
        }
    }catch(err){
        console.log(err);
        res.status(400).json({message:"error in registering user"});
    }
}

const loginUser = async(req,res)=>{
    try{
        const {email,password} = req.body;
        if(!email || !password){
            console.log(email , password);
            console.log("PLEASE FILL ALL THE FIELDS");
            res.status(400).json({message:"PLEASE FILL ALL THE FIELDS"});
        }else{
            const existingUser = await User.findOne({email:email});
            if(!existingUser){
                console.log("NO USER FOUND WITH THIS EMAIL");
                res.status(400).json({message:"NO USER FOUND WITH THIS EMAIL"});
            }else{
                bcrypt.compare(password,existingUser.password,async(err,result)=>{
                    if(err){
                        console.log("ERROR IN COMPARING PASSWORD : ",err);
                        res.status(400).json({message:"ERROR IN COMPARING PASSWORD"});
                    }else{
                        if(result){
                            const loggedUser = await User.findOne({_id:existingUser._id}).select("-password -refreshToken");
                            const accessToken = createToken({ email: email ,password:existingUser.password});
                            console.log("USER LOGGED IN SUCCESSFULLY");
                            res.status(200).json({message:"USER LOGGED IN SUCCESSFULLY",user:loggedUser,accessToken:accessToken});
                        }else{
                            console.log("WRONG PASSWORD");
                            res.status(400).json({message:"WRONG PASSWORD"});
                        }
                    }
                })
            }
        }
    }catch(err){
        console.log(err);
        res.status(400).json({message:"error in login user"});
    }
}
export {
    registerUser,
    loginUser
}