import express from "express";
import { allowTo, protectRoutes } from "../auth/auth.controller.js";
import { addToWishList, getAllWishList, removeFromWishList } from "./wishListController.js";
import {validation} from "./../middleware/validation.js"
import { addToWishlistVal, updateWishlistVal } from "./wishListValidation.js";

const wishListRoute = express.Router();


wishListRoute.patch('/', protectRoutes, allowTo('User','Admin'),validation(addToWishlistVal),addToWishList);
wishListRoute.delete('/', protectRoutes,allowTo('User','Admin'),validation(updateWishlistVal),removeFromWishList);
wishListRoute.get('/', protectRoutes, allowTo('User','Admin'),getAllWishList);

export default wishListRoute;