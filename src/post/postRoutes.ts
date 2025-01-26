import express from "express";
import { createPostController, deletePostController, getAllUserPostController, updatePostController } from "./postConrtroller";

const router = express.Router();

router.post("/", createPostController);
router.put("/:id", updatePostController);
router.get("/", getAllUserPostController);
router.delete("/:id", deletePostController);

export default router;
