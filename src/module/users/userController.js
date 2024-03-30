import { handleError } from "../middleware/HandleAsyncError.js";
import { deleteOne } from "../Handlers/apiHandler.js";
import ApiFeature from "../../../utils/ApiFeatures.js";
import userModel from "../../../DB/Model/user.model.js";
import { AppError } from "../../../utils/appError.js";

const addUser = async (req,res,next)=>{
    let user = await userModel.findOne({email:req.body.email});
    if(user) return next(new AppError("Already exist", 409))
    let add = new userModel(req.body);
    let addedUser = await add.save();
    res.json({message:"Done",addedUser});
}

const getUsers =handleError( async(req,res)=>{
    let apiFeature = new ApiFeature(userModel.find(),req.query).pagination().sort().search().fields();
    let result = await apiFeature.mongooseQuery;
    res.json({message:"Done",page:apiFeature.page,result});
})

const getUserById = handleError( async(req,res)=>{
    let gotUser = await userModel.findById(req.params.id);
    res.json({message:"Done",gotUser});
})

const updateUser = handleError( async(req,res)=>{
    let updatedUser = await userModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
    updatedUser && res.json({message:"Done",updatedUser});
    !updatedUser && res.json({message:"Not Found"});
})

const changePassword = handleError( async(req,res)=>{
    req.body.changePasswordAt = Date.now(); 
    let updatedUser = await userModel.findOneAndUpdate({_id:req.params.id},req.body,{new:true});
    updatedUser && res.json({message:"Done",updatedUser});
    !updatedUser && res.json({message:"Not Found"});
})

const deleteUser = deleteOne(userModel);


export {
    addUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
    changePassword
}