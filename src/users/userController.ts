import { Request, Response } from "express";
import { CustomeRequest } from "../type";
import {
  createUserService,
  deleteUserService,
  getAllUserService,
  getLoggedInUserService,
  getUserByIdUserService,
  updateUserService,
} from "./userService";

export const createUserController = async (req: Request, res: Response) => {
  try {
    const userId = (req as CustomeRequest).user?.id;
    const data = req.body;
    const result = await createUserService(userId, data);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllUserController = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const search = req.query.search as string;
    const result = await getAllUserService(page, limit, search);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getLoggedInUserController = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = (req as CustomeRequest).user?.id;
    const result = await getLoggedInUserService(userId);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserByIdController = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const result = await getUserByIdUserService(userId);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const userDeteleController = async (req: Request, res: Response) => {
  try {
    const userId = (req as CustomeRequest).user?.id;
    const Id = req.params.id;
    const result = await deleteUserService(userId, Id);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};  

export const updateUserController = async (req: Request, res: Response) => {
  try {
    const userId = (req as CustomeRequest).user?.id;
    const data = req.body;
    const result = await updateUserService(userId, data);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};