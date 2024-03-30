import { handleError } from "../middleware/HandleAsyncError.js";
import ApiFeature from "../../../utils/ApiFeatures.js";
import { AppError } from "../../../utils/appError.js";
import userModel from "../../../DB/Model/user.model.js";


const addToWishList = handleError( async(req,res,next)=>{

    let {product} = req.body;
    let updatedReview = await userModel.findOneAndUpdate({_id:req.user._id},{
        $addToSet:{wishList: product},
    },{new:true});
    updatedReview && res.json({message:"Done",updatedReview});
    !updatedReview && res.json({message:"Not Found"});
});

const removeFromWishList = handleError( async(req,res,next)=>{

    let {product} = req.body;
    let updatedReview = await userModel.findOneAndUpdate({_id:req.user._id},{
        $pull:{wishList: product},
    },{new:true});
    updatedReview && res.json({message:"Done",updatedReview});
    !updatedReview && res.json({message:"Not Found"});
});

const getAllWishList = handleError( async(req,res,next)=>{

    let result = await userModel.findOne({_id:req.user._id}).populate("wishList");
    result && res.json({message:"Done",result: result.wishList});
    !result && res.json({message:"Not Found"});
});

export {
    addToWishList,
    removeFromWishList,
    getAllWishList
}