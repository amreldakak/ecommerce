import express from "express";
import { protectRoutes } from "../auth/auth.controller.js";
import { addToWishList, getAllWishList, removeFromWishList } from "./wishListController.js";
import {validation} from "./../middleware/validation.js"
import { addToWishlistVal, updateWishlistVal } from "./wishListValidation.js";

const wishListRoute = express.Router();


wishListRoute.patch('/', protectRoutes, validation(addToWishlistVal),addToWishList);
wishListRoute.delete('/', protectRoutes,removeFromWishList);
wishListRoute.get('/', protectRoutes, validation(updateWishlistVal),getAllWishList);

export default wishListRoute;