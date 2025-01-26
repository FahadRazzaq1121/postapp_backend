import { Request, Response } from "express";
import { loginService } from "./authService";

export const loginController = async (req: Request, res: Response) => {
  try {
    const result = await loginService(req.body);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
