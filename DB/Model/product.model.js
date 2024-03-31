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
    slug:{
        type: String,
        unique: true,
        lowercase: true
    },
    description:{
        type: String,
        minLength:[3,"title is too short"],
        maxLength:[300,"title is too Long"],
        unique: true
    },
    price:{
        type:Number,
        min:0,
        required:true
    },
    priceAfterDiscount:{
        type:Number,
        min:0,
        required:true
    },
    category:{
        type: mongoose.Types.ObjectId,
        ref:'Category'
    },
    subCategory:{
        type: mongoose.Types.ObjectId,
        ref:'SubCategory'
    },
    brand:{
        type: mongoose.Types.ObjectId,
        ref:'Brand'
    },
    createdBy:{
        type: mongoose.Types.ObjectId,
        ref:'User'
    },
    imageCover: String,
    images:[String],
    sold:{
        type:Number,
        required:true,
        default:0,
    },
    quantity:{
        type:Number,
        required:true,
        default:0,
        min:0
    },
    rateCount:Number,
    rateAvg:{
        type:Number,
            min:0,
            max:5
    },
    

},
    {timestamps:true,toJSON: { virtuals: true }, toObject: { virtuals: true }}
);

Schema.post("init",function(doc){
    doc.imageCover = process.env.BASEURL + "uploads/" + doc.imageCover;
    if(doc.images) doc.images = doc.images.map(ele=> process.env.BASEURL + "uploads/" + ele);
})

Schema.virtual('myReviews', {
    ref: 'Review',
    localField: '_id',
    foreignField: 'product'
});

Schema.pre(/^find/,function() {
    this.populate('myReviews')
})

const ProductModel = mongoose.model("Product",Schema);

export default ProductModel;