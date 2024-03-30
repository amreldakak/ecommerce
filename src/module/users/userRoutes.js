import express from "express";
import { addUser, changePassword, deleteUser, getUserById, getUsers, updateUser } from "./userController.js"


const userRoute = express.Router();


userRoute.route("/")
.post(addUser)
.get(getUsers)

userRoute.route("/:id")
.get(getUserById)
.put(updateUser)
.delete(deleteUser)

userRoute.patch("/changepassword/:id", changePassword);

export default userRoute;