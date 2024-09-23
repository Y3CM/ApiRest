import { Router } from "express";
import {
  getAllProductos,
  getProductoById,
  createProducto,
  updateProducto,
  deleteProducto,
} from "../models/ProductosModel.js"; 

const router = Router();


router.get("/productos", getAllProductos); 
router.get("/productos/:id", getProductoById); 
router.post("/productos", createProducto); 
router.put("/productos/:id", updateProducto); 
router.delete("/productos/:id", deleteProducto); 

export default router;
