import express from "express";
import {
  createUserController,
  getAllUserController,
  getLoggedInUserController,
  getUserByIdController,
  updateUserController,
  userDeteleController,
} from "./userController";

const router = express.Router();

router.post("/", createUserController);
router.get("/", getAllUserController);
router.get("/me", getLoggedInUserController);
router.get("/:id", getUserByIdController);
router.delete("/:id", userDeteleController);
router.put("/:id", updateUserController);

export default router;
