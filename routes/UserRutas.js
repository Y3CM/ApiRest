import { Router } from "express";

import { getAllUsers } from "../models/UsersModel.js";

const router = Router();

router.get("/users", getAllUsers);


export default router;