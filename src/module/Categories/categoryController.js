import slugify from "slugify";
import categoryModel from "../../../DB/Model/category.Model.js";
import { handleError } from "../middleware/HandleAsyncError.js";
import { deleteOne } from "../Handlers/apiHandler.js";
import ApiFeature from "../../../utils/ApiFeatures.js";

const addCategory = handleError( async (req,res)=>{

    console.log(req.file);
    req.body.slug = slugify(req.body.title);
    req.body.image= req.file.filename;
    let add = new categoryModel(req.body);
    let addedCategory = await add.save();
    res.json({message:"Done",addedCategory});
})

const getCategories =handleError( async(req,res)=>{
    let apiFeature = new ApiFeature(categoryModel.find(),req.query).pagination().sort().search().fields()
    let result = await apiFeature.mongooseQuery;
    res.json({message:"Done",page:apiFeature.page,result});
})

const getCategoryById = handleError( async(req,res)=>{
    let gotCategory = await categoryModel.findById(req.params.id);
    res.json({message:"Done",gotCategory});
})

const updateCategory = handleError( async(req,res)=>{
    req.body.slug = slugify(req.body.title);
    let updatedCategory = await categoryModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
    updatedCategory && res.json({message:"Done",updatedCategory});
    !updatedCategory && res.json({message:"Not Found"});
})

const deleteCategory = deleteOne(categoryModel);



export {
    addCategory,
    getCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
}