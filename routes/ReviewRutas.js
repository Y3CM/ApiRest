import { Router } from "express";

import { getAllReview } from "../models/ReviewModel.js";

const router = Router();

router.get("/review", getAllReview);

export default router;