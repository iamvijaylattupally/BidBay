import mongoose from "mongoose";
import Product from "../models/product.model.js";
import User from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const addProduct = async(req,res)=>{
    try{
        const {name,startprice,description,sellerid} = req.body;
        
        const user = await User.findById(sellerid);
        if(!user){
            return res.status(404).json({message:"User not found"});
        }else{
            const productImageLocalPath = req.files?.productimage[0]?.path;
            if(!productImageLocalPath){
                return res.status(400).json({message:"Product image is required"});
            }else{
                const image = await uploadOnCloudinary(productImageLocalPath);
                if(!image){
                    return res.status(500).json({message:"error in uploading to cloudinary Internal server error"});
                }else{
                    const product = await Product.create({productname:name,productimage:image.url,startprice:startprice,currentprice:startprice,description:description,sellerid:sellerid,sellermail:user.email});
                    await user.userproducts.push(product._id);
                    await user.save();
                    await product.save();
                    return res.status(201).json({meassage:"product created successfully",product:product});
                }
            }
        }
    }catch(err){
        console.log(err);
        return res.status(500).json({message:"error while adding product Internal server error"});
    }
}

const addProductToCart = async(req,res)=>{
    try{
        const {userid,productid} = req.body;
        if(!userid || !productid){
            return res.status(404).json({message:"User not found"});
        }else{
            const product = await Product.findById(productid);
            const user = await User.findById(userid);
            if(!user || !product){
                res.status(200).json({message:"No such User or Product found"});
            }else{
                const existingproduct = user.cartproducts.find((pid) => pid == productid);
                if(!existingproduct){
                    await user.cartproducts.push(productid);
                    await user.save();
                    res.status(200).json({meassage:"Product added to cart"})
                    
                }else{
                    res.status(400).json({message:"product already exists in cart"});
                }
            }
        }
    }catch(err){
        console.log("error adding product to cart "+err);
        res.status(500).json({message:"Error in adding to cart please try again"});
    }
}

const getProducts = async (req,res)=>{
    try{
        const {userid} = req.body;
        const products = await Product.find();
        const filteredproducts = products.filter((pro)=>pro.sellerid!=userid);
        console.log("get products is successfull");
        res.status(200).json({products:filteredproducts});
    }catch(err){
        console.log("Error in retrieving products "+err);
        res.status(500).json({message:"Try again"})
    }
}

const getCartProducts = async (req, res) => {
    try {
        const { userid } = req.body;
        const user = await User.findById(userid);

        const productPromises = user.cartproducts.map(async (pid) => {
            let prod = await Product.findById(pid);
            if (prod) {
                return prod;
            } else {
                user.cartproducts = user.cartproducts.filter((pro) => pro != pid);
                await user.save(); // Await the save operation
            }
        });

        const products = await Promise.all(productPromises);

        console.log("get cartproducts is successful");
        res.status(200).json({ products: products });
    } catch (err) {
        console.log("Error in retrieving products " + err);
        res.status(500).json({ message: "Try again",products:[] });
    }
};


const deleteCartProduct = async (req, res) => {
    try {
        const { pid, userid } = req.body;
        const user = await User.findOne({ _id: userid }); // Corrected: Pass the query object
        user.cartproducts = user.cartproducts.filter(prid => prid != pid); // Update user.cartproducts
        await user.save();
        console.log("delete cart product is successful");
        res.status(200).json({ message: "deleted" });
    } catch (error) {
        console.log("Error in deleting product " + error);
        res.status(500).json({ message: "Try again" });
    }
}


export {
    addProduct,
    addProductToCart,
    getProducts,
    getCartProducts,
    deleteCartProduct
}