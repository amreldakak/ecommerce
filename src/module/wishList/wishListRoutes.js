import express from "express";
import { protectRoutes } from "../auth/auth.controller.js";
import { addToWishList, getAllWishList, removeFromWishList } from "./wishListController.js";

const wishListRoute = express.Router();


wishListRoute.patch('/', protectRoutes,addToWishList);
wishListRoute.delete('/', protectRoutes,removeFromWishList);
wishListRoute.get('/', protectRoutes,getAllWishList);

export default wishListRoute;