import express from "express";
import { signIn, signUp } from "./auth.controller.js";


const authRoute = express.Router();


authRoute.post("/signup",signUp)
authRoute.post("/signin",signIn)

export default authRoute;