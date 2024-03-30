import express from "express";
import { protectRoutes } from "../auth/auth.controller.js";
import { addCart, applyCoupon, deleteCart, getCart, removeCartItem, updateCart } from "./cartController.js";

const cartRoute = express.Router();


cartRoute.route("/")
.post(protectRoutes,addCart)
.get(protectRoutes,getCart)
.put(protectRoutes,updateCart)

cartRoute.route("/:id")
.patch(protectRoutes,removeCartItem)
//.delete(deleteCart)

cartRoute.put("/:code",protectRoutes,applyCoupon)


export default cartRoute;