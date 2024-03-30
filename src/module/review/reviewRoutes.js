import express from "express";
import { addReview, deleteReview, getReviewById, getReviews, updateReview } from "./reviewController.js";
import { protectRoutes } from "../auth/auth.controller.js";
import { validation } from "../middleware/validation.js"
import { byIdVal, createReviewVal, updateReviewVal,  } from "./reviewValidation.js";

const reviewRoute = express.Router();


reviewRoute.route("/")
.post(protectRoutes,validation(createReviewVal),addReview)
.get(getReviews)

reviewRoute.route("/:id")
.get(validation(byIdVal),getReviewById)
.patch(protectRoutes,validation(updateReviewVal),updateReview)
.delete(validation(byIdVal),deleteReview)

export default reviewRoute;