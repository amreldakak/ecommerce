import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
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
    totalOrderPrice:Number,
    discount:Number,
    totalOrderPriceAfterDiscount: Number,
    paymentMethod:{
        type:String,
        enums:["cash","credit"],
        default:"cash",
    },
    user:{
        type: mongoose.Types.ObjectId,
        ref:'User'
    },
    shippingAddress:{
        city: String,
        street: String
    },
    isPaid: Boolean,
    paidAt: Date,
    isDelivered: Boolean,
},{
    timestamps:true,
});


const orderModel = mongoose.model("Order",OrderSchema);

export default orderModel;