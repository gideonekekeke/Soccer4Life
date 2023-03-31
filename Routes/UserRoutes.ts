import express from "express";
import { createUser, GetUser, GetUsers } from "../Controllers/UserController";
const router = express.Router();

router.post("/create-account", createUser);
router.get("/", GetUsers);
router.get("/:id", GetUser);

export default router;
