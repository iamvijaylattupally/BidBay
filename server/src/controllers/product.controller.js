import mongoose from "mongoose";
import Product from "../models/product.model.js";
import User from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const addProduct = async(req,res)=>{
    try{
        const {name,startprice,description,sellerid} = req.body;
        console.log(name,startprice,description,sellerid)
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
        const productPromises = user.cartproducts.map(async (pid) => {
            let prod = await Product.findById(pid);
        });
        const products = await Promise.all(productPromises);
        console.log("delete cart product is successful");
        res.status(200).json({ message: "deleted",products:products});
    } catch (error) {
        console.log("Error in deleting product " + error);
        res.status(500).json({ message: "Try again" });
    }
}

const getSingleProduct = async(req,res)=>{
    try{
        const pid = req.params.pid;
        if(pid){
            const product = await Product.findById(pid);
            if(product){
                res.status(200).json({product:product});
            }else{
                res.status(404).json({message:"Product not found"});
            }
        }else{
            res.status(404).json({message:"Product not found"});
        }
    }catch(err){
        console.log("Error in getting single product "+err);
        res.status(500).json({message:"Try again"});
    }
}

async function getUserProducts(req,res){
    try{
        const {userid} = req.body;
        const user = await User.findById(userid);
        if(user){
            const up = user.userproducts;
            console.log(up);
            
            const productPromises = up.map(async(pid)=>{
                let prod = await Product.findById(pid);
                return prod;
            
            })
            const products = await Promise.all(productPromises);
            
            res.status(200).json({products:products});
        }else{
            res.status(404).json({message:"User not found"});
        }
    }catch(err){
        console.log("Error in getting user products "+err);
        res.status(500).json({message:"Try again"});
    }
}

const getSellProduct = async(req,res)=>{
    try{
        const pid = req.params.pid;
        const product = await Product.findById(pid);
        if(product){
            if(product.status){
                if(product.highestbidder==null){
                    res.status(200).json({product:product});
                }else{
                const buyer = await User.findById(product.highestbidder).select("-password -refreshToken -cartproducts -productsbought");
                if(buyer){
                    res.status(200).json({product:product,buyer:buyer});
                }else{
                    res.status(404).json({message:"Buyer not found"});
                }
            }
            }else{
                const buyer = await User.findById(product.highestbidder).select("-password -refreshToken -cartproducts -productsbought");
                res.status(200).json({message:"Product is already sold" , product:product,buyer:buyer});
            }
        }else{
            res.status(404).json({message:"Product not found"});
        }
    }catch(err){
        console.log("Error in selling product "+err);
        res.status(500).json({message:"Try again"});
    }
}

const soldProduct = async(req,res)=>{
    try{
        const {pid,bid,sid} = req.body;
        console.log(pid,bid,sid);
        const product = await Product.findById(pid);
        const buyer = await User.findById(bid);
        const seller = await User.findById(sid);
        console.log(product,buyer,seller);
        if(product && buyer && seller){
            product.status = false;
            await product.save();
            const productsold = await Product.findById(pid);
            await buyer.productsbought.push(pid);
            await seller.save();
            await buyer.save();
            const buyersold = await User.findById(bid);
            res.status(200).json({message:"Product sold successfully",product:productsold,buyer:buyersold});
        }else{
            res.status(404).json({message:"Product not found"});
        }
    }catch(err){
        console.log("Error in selling product "+err);
        res.status(500).json({message:"Try again"});
    }
}

export {
    addProduct,
    addProductToCart,
    getProducts,
    getCartProducts,
    deleteCartProduct,
    getSingleProduct,
    getUserProducts,
    getSellProduct,
    soldProduct
}