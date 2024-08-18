import { Router } from "express";

import { getAllCategorias, createCategoria } from "../models/CategoriasModel.js";

const router = Router();

router.get("/categorias", getAllCategorias);
router.post("/categorias", createCategoria);

export default router;

