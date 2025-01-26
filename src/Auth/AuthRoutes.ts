import express from "express";
import { loginController } from "./authController";

const router = express.Router();

router.post("/login", loginController);

export default router;
