import { Router } from "express";

import { getAllComentarios } from "../models/ComentariosModel.js";

const router = Router();

router.get("/comentarios", getAllComentarios);

export default router;