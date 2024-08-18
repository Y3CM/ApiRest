import { Router } from "express";
import { getAllProductos } from "../models/productosModel.js";
import { getProductoById } from "../models/productosModel.js";

const router = Router();

router.get("/productos", getAllProductos);
router.get("/productos/:id", getProductoById); // Ruta para un producto específico


export default router;