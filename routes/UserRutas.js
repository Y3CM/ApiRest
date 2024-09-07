import { Router } from "express";
import { getAllUsers, getUser, createUser, updateUser, deleteUser, login } from "../models/UsersModel.js";
import authMiddleware from '../middlewares/authMiddleware.js'; // Asegúrate de ajustar la ruta al archivo

const router = Router();

// Iniciar sesión (sin protección)
router.post("/login", login);

// Obtener todos los usuarios (protegido)
router.get("/users", authMiddleware, getAllUsers);

// Obtener un usuario específico por ID (protegido)
router.get("/users/:id", authMiddleware, getUser);

// Crear un nuevo usuario (protegido)
router.post("/users", authMiddleware, createUser);

// Actualizar un usuario existente por ID (protegido)
router.put("/users/:id", authMiddleware, updateUser);

// Eliminar un usuario por ID (protegido)
router.delete("/users/:id", authMiddleware, deleteUser);

export default router;
