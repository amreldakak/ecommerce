import express from "express";
import { addCategory, deleteCategory, getCategories, getCategoryById, updateCategory } from "./categoryController.js";
import { uploadSingle } from "../../../utils/fileUpload.js";
import { addCategorySchema, getByIdSchema, updateCategorySchema } from "./categoryValidation.js";
import {validation} from "./../middleware/validation.js"
import subCategoryRoute from "../SubCategories/subCategoryRoutes.js";

const categoryRoute = express.Router();

categoryRoute.use("/:id/subcategory",subCategoryRoute)

categoryRoute.route("/")
.post(uploadSingle('image'),validation(addCategorySchema),addCategory)
.get(getCategories)

categoryRoute.route("/:id")
.get(validation(getByIdSchema),getCategoryById)
.patch(validation(updateCategorySchema),updateCategory)
.delete(validation(getByIdSchema),deleteCategory)



export default categoryRoute;