import Bid from "../models/bid.model.js";
import Product from "../models/product.model.js";
import User from "../models/user.model.js";

const addBid = async (req, res) => {
    try {
        const { bidprice, bidder, productid } = req.body;
        const product = await Product.findById(productid);
        const user = await User.findById(bidder);
        if (!product || !user) {
            return res.status(404).json({ message: "Product or User not found" });
        } else {
            if (bidprice <= product.currentprice) {
                return res.status(400).json({ message: "Bid price should be greater than current price" });
            } else {
                const existingbid = await Bid.findOne({ productid: productid, bidder: bidder });
                if (existingbid) {
                    existingbid.bidprice = bidprice;
                    await existingbid.save();
                    product.currentprice = bidprice;
                    await product.save();
                    return res.status(200).json({ message: "Bid updated successfully" });
                } else {
                    const bid = await Bid.create({ bidprice: bidprice, bidder: bidder, productid: productid });
                    await bid.save();
                    product.highestbidder = user._id;
                    product.highestbiddermail = user.email;
                    product.currentprice = bidprice;
                    product.bids.push(bid._id);
                    await product.save();
                    return res.status(201).json({ message: "Bid added successfully", bid: bid });
                }
            }
        }
    } catch (error) {
        console.log("error in adding bid " + error);
        res.status(500).json({ message: "Error in adding bid please try again" });
    }
}

const getBids = async (req, res) => {
    try {
        const { userid } = req.body;
        const bids = await Bid.find({ bidder: userid });
        if (!bids || userid == null) {
            return res.status(404).json({ message: "User not found" });
        } else {
            let products = [];
            for (const bid of bids) {
                const product = await Product.findById(bid.productid);
                const productWithBidPrice = {
                    ...product.toObject(), 
                    userbidprice: bid.bidprice 
                };
                products.push(productWithBidPrice);
            }
            console.log(products);
            res.status(200).json({ message: "Bids fetched successfully", products: products });
        }
    } catch (error) {
        console.log("error in getting bids " + error);
        res.status(500).json({ message: "Error in getting bids please try again" });
    }
}


export { addBid,
    getBids,
};