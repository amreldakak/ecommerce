import express from "express";
import { signIn, signUp } from "./auth.controller.js";
import { validation } from "../middleware/validation.js"
import { signInVal, signUpVal } from "./auth.Validation.js";


const authRoute = express.Router();


authRoute.post("/signup",validation(signUpVal),signUp)
authRoute.post("/signin",validation(signInVal),signIn)

export default authRoute;