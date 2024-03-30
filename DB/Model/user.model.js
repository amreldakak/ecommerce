import mongoose from "mongoose";
import bcrypt from "bcrypt";
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required: true,
        unique: true,
    },
    email:{
        type:String,
        required: true,
        unique: true,
    },
    changePasswordAt:Date,
    role:{
        type:String,
        enums:["Admin","User"],
        default:"User"
    },
    password:{
        type:String,
        required: true
    },
    isActive:{
        type: Boolean,
        default:true
    },
    isBlocked:{
        type: Boolean,
        default:false
    },
    isVerified:{
        type: Boolean,
        default:false
    },
    phone:String,
    wishList:[{
        type: mongoose.Types.ObjectId,
        ref: 'Product'
    }],
    address:[{
        street:String,
        city:String
    }],
},{ timestamps:true});

userSchema.pre("save",function(){
    console.log(this);
    this.password=bcrypt.hashSync(this.password,7);
})

userSchema.pre("findOneAndUpdate",function(){
    if (this._update.password) {
    this._update.password=bcrypt.hashSync(this._update.password,Number(process.env.ROUND));
    }
})


const userModel = mongoose.model("User",userSchema);

export default userModel;