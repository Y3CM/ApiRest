import { Router } from "express";

import { getAllComentarios, createComentarios } from "../models/ComentariosModel.js";

const router = Router();

router.get("/comentarios", getAllComentarios);
router.post("/comentarios", createComentarios);

export default router;