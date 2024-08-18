import { Router } from "express";

import { getAllCategorias } from "../models/CategoriasModel.js";

const router = Router();

router.get("/categorias", getAllCategorias);

export default router;

