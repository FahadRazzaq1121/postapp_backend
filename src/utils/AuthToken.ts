import dotenv from "dotenv";
import { Response, NextFunction, Request } from "express";
import jwt from "jsonwebtoken";
import { CustomeRequest } from "../type";

dotenv.config();
export const authenticateJWT = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    (req as CustomeRequest).user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
};
