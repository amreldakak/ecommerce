import express from "express";
import { allowTo, protectRoutes } from "../auth/auth.controller.js";
import { addAddress} from "./addressController.js";
import {validation} from "./../middleware/validation.js"
import { addToaddressVal, getByIdVal, updateaddressVal } from "./addressValidation.js";

const addressRoute = express.Router();


addressRoute.patch('/', protectRoutes, allowTo("User"),validation(addToaddressVal),addAddress);
//addressRoute.delete('/', protectRoutes, validation(getByIdVal),removeFromaddress);
//addressRoute.get('/', protectRoutes, validation(updateaddressVal),getAlladdress);

export default addressRoute;