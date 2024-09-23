import { Router } from "express";
import {
  getAllReviews,
  getReviewById,
  createReview,
  updateReview,
  deleteReview
} from "../models/ReviewModel.js"; 
import authMiddleware from '../middlewares/authMiddleware.js';

const router = Router();

// Ruta para obtener todas las reseñas
router.get("/reviews", authMiddleware, getAllReviews);

// Ruta para obtener una reseña por ID
router.get("/reviews/:id", authMiddleware, getReviewById);

// Ruta para crear una nueva reseña
router.post("/reviews", authMiddleware, createReview);

// Ruta para actualizar una reseña por ID
router.put("/reviews/:id", authMiddleware, updateReview);

// Ruta para eliminar una reseña por ID
router.delete("/reviews/:id", authMiddleware, deleteReview);

export default router;
