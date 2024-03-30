import express from "express";
import { allowTo, protectRoutes } from "../auth/auth.controller.js";
import { addAddress, getAllAddress, removeFromAddress} from "./addressController.js";
import {validation} from "./../middleware/validation.js"
import { addAddressVal, getByIdVal, updateAddressVal } from "./addressValidation.js";

const addressRoute = express.Router();


addressRoute.patch('/', protectRoutes, allowTo('User'),validation(addAddressVal),addAddress);
addressRoute.delete('/:id', protectRoutes, allowTo('User','Admin'), validation(getByIdVal),removeFromAddress);
addressRoute.get('/', protectRoutes, allowTo('User'),validation(updateAddressVal),getAllAddress);

export default addressRoute;