import { date } from "joi";
import mongoose from "mongoose";

const Schema = new mongoose.Schema({
    code:{
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    discount:{
        type:Number,
        min:0,
    },
    expires: Date

},{
    timestamps:true,
});

const couponModel = mongoose.model("Coupon",Schema);

export default couponModel;