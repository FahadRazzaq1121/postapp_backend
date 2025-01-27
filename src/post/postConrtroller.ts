import { Request, Response } from "express";
import { CustomeRequest } from "../type";
import {
  createPostService,
  deletePostService,
  getAllUserPostService,
  updatePostService,
} from "./postService";

export const createPostController = async (req: Request, res: Response) => {
  try {
    const userId = (req as CustomeRequest).user?.id;
    const data = req.body;
    const result = await createPostService(userId, data, req.file);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updatePostController = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const postId = req.params.id;
    const result = await updatePostService(data, postId, req.file);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllUserPostController = async (req: Request, res: Response) => {
  try {
    const userId = (req as CustomeRequest).user?.id;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const search = req.query.search as string;
    const result = await getAllUserPostService(userId, page, limit, search);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deletePostController = async (req: Request, res: Response) => {
  try {
    const postId = req.params.id;
    const result = await deletePostService(postId);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
