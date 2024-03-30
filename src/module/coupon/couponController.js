import { handleError } from "../middleware/HandleAsyncError.js";
import { deleteOne } from "../Handlers/apiHandler.js";
import ApiFeature from "../../../utils/ApiFeatures.js";
import { AppError } from "../../../utils/appError.js";
import couponModel from "../../../DB/Model/coupon.model.js";
import  QRCode  from "qrcode";

const addCoupon = handleError( async (req,res,next)=>{

    let check = await couponModel.find({code:req.body.code})
    if(!check) return next(new AppError("Already exist",409));

    let add = new couponModel(req.body);
    let url = await QRCode.toDataURL(add.code)
    let addedCoupon = await add.save();
    res.json({message:"Done",addedCoupon,url});
})

const getCoupons =handleError( async(req,res,next)=>{
    let apiFeature = new ApiFeature(couponModel.find(),req.query).pagination().sort().search().fields();
    let result = await apiFeature.mongooseQuery;
    res.json({message:"Done",page:apiFeature.page,result});
})

const getCouponById = handleError( async(req,res,next)=>{
    let gotCoupon = await couponModel.findById(req.params.id);
    res.json({message:"Done",gotCoupon});
})

const updateCoupon = handleError( async(req,res,next)=>{

    let updatedCoupon = await couponModel.findOneAndUpdate({_id:req.params.id},req.body,{new:true});
    let url = await QRCode.toDataURL(updatedCoupon.code)
    updatedCoupon && res.json({message:"Done",updatedCoupon,url});
    !updatedCoupon && res.json({message:"Not Found"});
})

const deleteCoupon = deleteOne(couponModel);


export {
    addCoupon,
    getCoupons,
    getCouponById,
    updateCoupon,
    deleteCoupon
}