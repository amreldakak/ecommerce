import express from "express";
import { allowTo, protectRoutes } from "../auth/auth.controller.js";
import { addCoupon, deleteCoupon, getCouponById, getCoupons, updateCoupon } from "./couponController.js"
import { validation } from "../middleware/validation.js"
import { createCouponVal, getCouponVal, updateCouponVal } from "./couponValidation.js";

const couponRoute = express.Router();


couponRoute.route("/")
.post(protectRoutes,allowTo('Admin'),validation(createCouponVal),addCoupon)
.get(getCoupons)

couponRoute.route("/:id")
.get(validation(getCouponVal),getCouponById)
.patch(protectRoutes, allowTo('Admin'), validation(updateCouponVal), updateCoupon)
.delete(protectRoutes, allowTo('Admin'), validation(getCouponVal), deleteCoupon)

export default couponRoute;