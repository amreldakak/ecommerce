import express from "express";
import { protectRoutes } from "../auth/auth.controller.js";
import { addCoupon, deleteCoupon, getCouponById, getCoupons, updateCoupon } from "./couponController.js"

const couponRoute = express.Router();


couponRoute.route("/")
.post(addCoupon)
.get(getCoupons)

couponRoute.route("/:id")
.get(getCouponById)
.patch(protectRoutes,updateCoupon)
.delete(deleteCoupon)

export default couponRoute;