import express from "express";
import { allowTo, protectRoutes } from "../auth/auth.controller.js";
import { addAddress} from "./addressController.js";
import {validation} from "./../middleware/validation.js"
import { addAddressVal } from "./addressValidation.js";

const addressRoute = express.Router();


addressRoute.patch('/', protectRoutes, allowTo('User'),validation(addAddressVal),addAddress);
//addressRoute.delete('/', protectRoutes, validation(getByIdVal),removeFromaddress);
//addressRoute.get('/', protectRoutes, validation(updateaddressVal),getAlladdress);

export default addressRoute;