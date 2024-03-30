import { handleError } from "../middleware/HandleAsyncError.js";
import { deleteOne } from "../Handlers/apiHandler.js";
import ApiFeature from "../../../utils/ApiFeatures.js";
import reviewModel from "../../../DB/Model/reviews.model.js";
import { AppError } from "../../../utils/appError.js";

const addReview = handleError( async (req,res,next)=>{
    req.body.createdBy=req.user._id
    let check = await reviewModel.find({createdBy:req.user._id,product:req.body.product})
    if(!check) return next(new AppError("Already have review",409));
    let add = new reviewModel(req.body);
    let addedReview = await add.save();
    res.json({message:"Done",addedReview});
})

const getReviews =handleError( async(req,res,next)=>{
    let apiFeature = new ApiFeature(reviewModel.find(),req.query).pagination().sort().search().fields();
    let result = await apiFeature.mongooseQuery;
    res.json({message:"Done",page:apiFeature.page,result});
})

const getReviewById = handleError( async(req,res,next)=>{
    let gotReview = await reviewModel.findById(req.params.id);
    res.json({message:"Done",gotReview});
})

const updateReview = handleError( async(req,res,next)=>{
    // let check = await reviewModel.find({createdBy:req.user._id})
    // if(!check) return next(new AppError("Not the same User",401));
    let updatedReview = await reviewModel.findOneAndUpdate({_id:req.params.id,createdBy:req.user._id},req.body,{new:true});
    updatedReview && res.json({message:"Done",updatedReview});
    !updatedReview && res.json({message:"Not Found"});
})

const deleteReview = deleteOne(reviewModel);


export {
    addReview,
    getReviews,
    getReviewById,
    updateReview,
    deleteReview
}