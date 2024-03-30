import express from "express";
import { allowTo, protectRoutes } from "../auth/auth.controller.js";
import { createOnlineOrder, createOrder, getAllOrder, getMyOrder, onlinePayment } from "./orderController.js";
import { validation } from "../middleware/validation.js"
import { OrderByIdVal, createOrderVal } from "./orderValidation.js";

const orderRoute = express.Router();


orderRoute.route("/:id").post(protectRoutes, validation(createOrderVal), createOrder)
orderRoute.route("/onlinepayment/:id").post(protectRoutes, validation(OrderByIdVal), onlinePayment)
orderRoute.route("/").get(protectRoutes, getMyOrder)

orderRoute.get("/all",protectRoutes, allowTo('Admin'),getAllOrder)



export default orderRoute;