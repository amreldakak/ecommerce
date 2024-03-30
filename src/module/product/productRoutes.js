import express from "express";
import { uploadSingle,uploadFields } from "../../../utils/fileUpload.js";
import {validation} from "./../middleware/validation.js"
import{ addProduct, deleteProduct, getProductById, getProducts, updateProduct } from "./productController.js"
import { addProductSchema, getByIdSchema, updateProductSchema } from "./productValidation.js";
import { protectRoutes } from "../auth/auth.controller.js";

const productRoute = express.Router();


productRoute.route("/")
.post(protectRoutes,uploadFields([{name:"imageCover",maxCount:1},{name:"images",maxCount:10}]),validation(addProductSchema),addProduct)
.get(getProducts)

productRoute.route("/:id")
.get(validation(getByIdSchema),getProductById)
.patch(uploadFields([{name:"imgCover",maxCount:1},{name:"images",maxCount:10}]),validation(updateProductSchema),updateProduct)
.delete(validation(getByIdSchema),deleteProduct)

export default productRoute;