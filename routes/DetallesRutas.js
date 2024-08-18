import { Router } from "express";

import { getAllDetalles } from "../models/DetallesModel.js";

const router = Router();

router.get("/detalles", getAllDetalles);

export default router;