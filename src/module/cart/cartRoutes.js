import express from "express";
import { protectRoutes } from "../auth/auth.controller.js";
import { addCart, applyCoupon, getCart, removeCartItem, updateCart } from "./cartController.js";
import { validation } from "../middleware/validation.js"
import { ByIdVal, CartVal, CouponVal, updateCartVal } from "./cart.Validation.js";

const cartRoute = express.Router();


cartRoute.route("/")
.post(protectRoutes,validation(CartVal),addCart)
.get(protectRoutes,getCart)
.put(protectRoutes,validation(updateCartVal),updateCart)

cartRoute.route("/:id")
.patch(protectRoutes,validation(ByIdVal),removeCartItem)

cartRoute.put("/:code",protectRoutes,validation(CouponVal),applyCoupon)


export default cartRoute;