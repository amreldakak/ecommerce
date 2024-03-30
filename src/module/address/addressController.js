import { handleError } from "../middleware/HandleAsyncError.js";
import { deleteOne } from "../Handlers/apiHandler.js";
import ApiFeature from "../../../utils/ApiFeatures.js";
import { AppError } from "../../../utils/appError.js";
import userModel from "../../../DB/Model/user.model.js";


const addAddress = handleError( async(req,res,next)=>{

    let address = await userModel.findOneAndUpdate({_id:req.user._id},{
        $addToSet:{address: req.body},
    },{new:true});
    address && res.json({message:"Done",address});
    !address && res.json({message:"Not Found"});
});

const removeFromAddress = handleError( async(req,res,next)=>{

    let {product} = req.body;
    let updatedReview = await userModel.findOneAndUpdate({_id:req.user._id},{
        $pull:{Address: product},
    },{new:true});
    updatedReview && res.json({message:"Done",updatedReview});
    !updatedReview && res.json({message:"Not Found"});
});

const getAllAddress = handleError( async(req,res,next)=>{

    let result = await userModel.findOne({_id:req.user._id}).populate("Address");
    result && res.json({message:"Done",result: result.Address});
    !result && res.json({message:"Not Found"});
});

export {
    addAddress,
    removeFromAddress,
    getAllAddress
}