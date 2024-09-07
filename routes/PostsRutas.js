import { Router } from "express";

import { getAllPosts, getPost, createPost, updatePost, deletePost } from "../models/PostModel.js";

import authMiddleware from '../middlewares/authMiddleware.js';

const router = Router();

router.get("/posts",authMiddleware,getAllPosts);

router.get("/posts/:id",authMiddleware,getPost);

router.post("/posts",authMiddleware,createPost);

router.put("/posts/:id",authMiddleware,updatePost);

router.delete("/posts/:id",authMiddleware,deletePost);

export default router;