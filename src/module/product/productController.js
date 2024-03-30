import slugify from "slugify";
import { handleError } from "../middleware/HandleAsyncError.js";
import ProductModel from "./../../../DB/Model/product.model.js";
import { deleteOne } from "../Handlers/apiHandler.js";
import ApiFeature from "../../../utils/ApiFeatures.js";




const addProduct = handleError( async (req,res)=>{

    console.log(req.file);
    req.body.slug = slugify(req.body.title);
    req.body.imageCover= req.files.imageCover[0].filename;
    req.body.images=req.files.images.map(ele => ele.filename);
    let add = new ProductModel(req.body);
    let addedProduct = await add.save();
    res.json({message:"Done",addedProduct});
})

const getProducts =handleError( async(req,res)=>{
    let apiFeature = new ApiFeature(ProductModel.find(),req.query).pagination().sort().search().fields()
    let result = await apiFeature.mongooseQuery;
    res.json({message:"Done",Page:apiFeature.page,result});
})

const getProductById = handleError( async(req,res)=>{
    let gotProduct = await ProductModel.findById(req.params.id);
    res.json({message:"Done",gotProduct});
})

const updateProduct = handleError( async(req,res)=>{
    req.body.slug = slugify(req.body.title);
    if(req.files.imageCover) req.body.imageCover= req.files.imageCover[0].filename;
    if(req.files.images) req.body.images=req.files.images.map(ele => ele.filename);
    let updatedProduct = await ProductModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
    updatedProduct && res.json({message:"Done",updatedProduct});
    !updatedProduct && res.json({message:"Not Found"});
})

const deleteProduct = deleteOne(ProductModel);



export {
    addProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
}