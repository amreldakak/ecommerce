import express from "express";
import { addReview, deleteReview, getReviewById, getReviews, updateReview } from "./reviewController.js";
import { protectRoutes } from "../auth/auth.controller.js";

const reviewRoute = express.Router();


reviewRoute.route("/")
.post(protectRoutes,addReview)
.get(getReviews)

reviewRoute.route("/:id")
.get(getReviewById)
.patch(protectRoutes,updateReview)
.delete(deleteReview)

export default reviewRoute;