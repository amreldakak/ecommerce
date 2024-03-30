import mongoose from "mongoose";

const Schema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        minLength:[3,"title is too short"],
        trim: true,
        unique: true
    },
    slug:{
        type: String,
        unique: true,
        lowercase: true
    },
    image : String,
    category :{
        type: mongoose.Types.ObjectId,
        ref:'Category'
    } ,
    createdBy:{
        type: mongoose.Types.ObjectId,
        ref:'User'
    }

},{
    timestamps:true,
});

Schema.post("init",function(doc){
    doc.image = process.env.BASEURL + "uploads/" + doc.image;
})

const SubCategoryModel = mongoose.model("SubCategory",Schema);

export default SubCategoryModel;