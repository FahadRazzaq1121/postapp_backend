import { Request } from "express";
import Users from "./users/userModel";

export type CustomeRequest = Request & {
  user?: Users;
};

export type Login = {
  email: string;
  password: string;
};

export type UsersI = {
  _id: string;
  email: string;
  name: string;
  password: string;
  role?: string;
};

export type PostI = {
  title: string;
  content: string;
  image: string;
  author_id: string;
};
