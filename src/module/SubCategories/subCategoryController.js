import slugify from "slugify";
import { handleError } from "../middleware/HandleAsyncError.js";
import SubCategoryModel from "../../../DB/Model/subCategoryModel.js";
import { deleteOne } from "../Handlers/apiHandler.js";
import ApiFeature from "../../../utils/ApiFeatures.js";

const addSubCategory = handleError( async (req,res)=>{

    req.body.slug = slugify(req.body.title);
    req.body.image= req.file.filename;
    let add = new SubCategoryModel(req.body);
    let addedSubCategory = await add.save();
    res.json({message:"Done",addedSubCategory});
})

const getSubCategories =handleError( async(req,res)=>{
    let apiFeature = new ApiFeature(SubCategoryModel.find(),req.query).pagination().sort().search().fields()
    let result = await apiFeature.mongooseQuery;
    res.json({message:"Done",page:apiFeature.page,result});
})

const getSubCategoryById = handleError( async(req,res)=>{
    let gotSubCategory = await SubCategoryModel.findById(req.params.id);
    res.json({message:"Done",gotSubCategory});
})

const updateSubCategory = handleError( async(req,res)=>{
    req.body.slug = slugify(req.body.title);
    let updatedSubCategory = await SubCategoryModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
    updatedSubCategory && res.json({message:"Done",updatedSubCategory});
    !updatedSubCategory && res.json({message:"Not Found"});
})

const deleteSubCategory = deleteOne(SubCategoryModel);


export {
    addSubCategory,
    getSubCategories,
    getSubCategoryById,
    updateSubCategory,
    deleteSubCategory
}