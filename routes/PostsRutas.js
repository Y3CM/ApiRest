import { Router } from "express";

import { getAllPosts, getPost, createPost } from "../models/PostModel.js";

const router = Router();

router.get("/posts",getAllPosts);
router.get("/posts/:id",getPost);
router.post("/posts",createPost);

export default router;