import { Router } from "express";

import { getAllPosts } from "../models/PostModel.js";

const router = Router();

router.get("/posts",getAllPosts);

export default router;