import express from "express";
import { uploadSingle } from "../../../utils/fileUpload.js";
import { addSubCategorySchema, getByIdSchema, updateSubCategorySchema } from "./subCategoryValidation.js";
import {validation} from "./../middleware/validation.js"
import { addSubCategory, deleteSubCategory, getSubCategories, getSubCategoryById, updateSubCategory } from "./subCategoryController.js";

const subCategoryRoute = express.Router({mergeParams:true});


subCategoryRoute.route("/")
.post(uploadSingle('image'),validation(addSubCategorySchema),addSubCategory)
.get(getSubCategories)

subCategoryRoute.route("/:id")
.get(validation(getByIdSchema),getSubCategoryById)
.patch(validation(updateSubCategorySchema),updateSubCategory)
.delete(validation(getByIdSchema),deleteSubCategory)

export default subCategoryRoute;