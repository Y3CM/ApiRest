import { Router } from "express";

import { getAllPedidos } from "../models/PedidosModel.js";

const router = Router()


router.get("/pedidos",getAllPedidos)

export default router;