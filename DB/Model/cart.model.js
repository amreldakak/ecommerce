import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
    cartItems: [{
        product:{
            type: mongoose.Types.ObjectId,
            ref:"Product"
        },
        quantity:{
            type:Number,
            default:1
        },
        price:Number
    }],
    totalPrice:Number,
    discount:Number,
    totalPriceAfterDiscount: Number,
    user:{
        type: mongoose.Types.ObjectId,
        ref:'User'
    }

},{
    timestamps:true,
});


const cartModel = mongoose.model("Cart",CartSchema);

export default cartModel;