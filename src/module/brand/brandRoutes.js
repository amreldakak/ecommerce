import express from "express";
import { uploadSingle } from "../../../utils/fileUpload.js";
import {validation} from "./../middleware/validation.js"
import { addBrand, deleteBrand, getBrandById, getBrands, updateBrand } from "./brandController.js";
import { addBrandSchema, getByIdSchema, updateBrandSchema } from "./brandValidation.js";

const brandRoute = express.Router();


brandRoute.route("/")
.post(uploadSingle('image'),validation(addBrandSchema),addBrand)
.get(getBrands)

brandRoute.route("/:id")
.get(validation(getByIdSchema),getBrandById)
.patch(validation(updateBrandSchema),updateBrand)
.delete(validation(getByIdSchema),deleteBrand)

export default brandRoute;