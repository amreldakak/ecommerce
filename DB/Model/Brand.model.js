import mongoose from "mongoose";

const Schema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        minLength:[3,"title is too short"],
        maxLength:[30,"title is too Long"],
        trim: true,
        unique: true
    },
    logo:String,
    slug:{
        type: String,
        unique: true,
        lowercase: true
    },
    createdBy:{
        type: mongoose.Types.ObjectId,
        ref:'User'
    }

},{
    timestamps:true,
});

Schema.post("init",function(doc){
    doc.logo = process.env.BASEURL + "uploads/" + doc.logo;
})

const BrandModel = mongoose.model("Brand",Schema);

export default BrandModel;