import express from "express";
import { protectRoutes } from "../auth/auth.controller.js";
import { createOnlineOrder, createOrder, getMyOrder, onlinePayment } from "./orderController.js";


const orderRoute = express.Router();


orderRoute.route("/:id").post(protectRoutes, createOrder)
orderRoute.route("/onlinepayment/:id").post(protectRoutes, onlinePayment)
orderRoute.route("/").get(protectRoutes, getMyOrder)
orderRoute.post("/webhook",express.raw({type: 'application/json'}),createOnlineOrder)
//.put(protectRoutes,updateCart)

//orderRoute.route("/:id")
//.patch(protectRoutes,removeCartItem)
//.delete(deleteCart)



export default orderRoute;