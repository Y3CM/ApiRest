import { Router } from "express";

import { getAllUsers, getUser, createUser } from "../models/UsersModel.js";

const router = Router();

router.get("/users", getAllUsers);

router.get("/users/:id", getUser);

router.post("/users", createUser);

export default router;