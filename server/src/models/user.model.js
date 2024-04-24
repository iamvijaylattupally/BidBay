import mongoose from "mongoose";

const userSchema = mongoose.Schema(
    {
        email:{
            type:String,
            required:true,
            unique:true,
            lowercase:true
        },
        phonenumber:{
            type:String,
            required:true,
            unique:true,
        },  
        password:{
            type:String,
            required:true
        },
        name:{
            type:String,
            required:true
        },
        rating:{
            type:Number,
            default:0
        },
        productsbought:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"Product"
            }
        ],
        userproducts:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"Product"
            }
        ],
        cartproducts:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"Product"
            }
        ],
        refreshToken:{
            type:String
        }
    },{timestamps: true}
)

const User = mongoose.model("User", userSchema);
export default User;