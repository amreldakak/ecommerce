import mongoose from "mongoose";

const Schema = new mongoose.Schema({
    text:{
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    createdBy:{
        type: mongoose.Types.ObjectId,
        ref:'User'
    },
    product:{
        type: mongoose.Types.ObjectId,
        ref:'Product'
    },
    rating:{
        type: Number,
        min: 1,
        max: 5
    }

},{
    timestamps:true,
});

Schema.pre(/^find/,function() {
    this.populate('createdBy','username')
})

const reviewModel = mongoose.model("Review",Schema);

export default reviewModel;