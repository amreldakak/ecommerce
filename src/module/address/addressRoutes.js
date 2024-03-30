import express from "express";
import { allowTo, protectRoutes } from "../auth/auth.controller.js";
import { addAddress, removeFromAddress} from "./addressController.js";
import {validation} from "./../middleware/validation.js"
import { addAddressVal, getByIdVal } from "./addressValidation.js";

const addressRoute = express.Router();


addressRoute.patch('/', protectRoutes, allowTo('User'),validation(addAddressVal),addAddress);
addressRoute.delete('/:id', protectRoutes, allowTo('User','Admin'), validation(getByIdVal),removeFromAddress);
//addressRoute.get('/', protectRoutes, validation(updateaddressVal),getAlladdress);

export default addressRoute;