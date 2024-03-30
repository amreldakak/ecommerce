import slugify from "slugify";
import { handleError } from "../middleware/HandleAsyncError.js";
import BrandModel from "../../../DB/Model/Brand.model.js";
import { deleteOne } from "../Handlers/apiHandler.js";
import ApiFeature from "../../../utils/ApiFeatures.js";

const addBrand = handleError( async (req,res)=>{

    console.log(req.file);
    req.body.slug = slugify(req.body.title);
    req.body.logo= req.file.filename;
    let add = new BrandModel(req.body);
    let addedBrand = await add.save();
    res.json({message:"Done",addedBrand});
})

const getBrands =handleError( async(req,res)=>{
    let apiFeature = new ApiFeature(BrandModel.find(),req.query).pagination().sort().search().fields()
    let result = await apiFeature.mongooseQuery;
    res.json({message:"Done",page:apiFeature.page,result});
})

const getBrandById = handleError( async(req,res)=>{
    let gotBrand = await BrandModel.findById(req.params.id);
    res.json({message:"Done",gotBrand});
})

const updateBrand = handleError( async(req,res)=>{
    req.body.slug = slugify(req.body.title);
    if(req.file) req.body.logo= req.file.filename;
    let updatedBrand = await BrandModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
    updatedBrand && res.json({message:"Done",updatedBrand});
    !updatedBrand && res.json({message:"Not Found"});
})

const deleteBrand = deleteOne(BrandModel);


export {
    addBrand,
    getBrands,
    getBrandById,
    updateBrand,
    deleteBrand
}