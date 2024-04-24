import mongoose from "mongoose";

const bidSchema = new mongoose.Schema(
    {
        bidprice:{
            type:Number,
            required:true
        },
        bidder:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        productid:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Product"
        }
    },{timestamps:true}
)

const Bid = mongoose.model("Bid", bidSchema);
export default Bid;