import express from "express";
import { addUser, changePassword, deleteUser, getUserById, getUsers, updateUser } from "./userController.js"
import { allowTo, protectRoutes } from "../auth/auth.controller.js";
import { validation } from "../middleware/validation.js"
import { addUserVal, changePassVal, getByIdVal, updateUserVal } from "./userValidation.js";

const userRoute = express.Router();


userRoute.route("/")
.post(protectRoutes,allowTo('Admin'),validation(addUserVal),addUser)
.get(getUsers)
.put(protectRoutes,validation(updateUserVal),updateUser)

userRoute.route("/:id")
.get(validation(getByIdVal),getUserById)
.delete(protectRoutes,validation(getByIdVal),deleteUser)

userRoute.patch("/changepassword", protectRoutes, validation(changePassVal), changePassword);

export default userRoute;