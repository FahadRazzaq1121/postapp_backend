import { UsersI } from "../type";
import User from "./userModel";
import bcrypt from "bcryptjs";
import {  userSchema } from "./userValidation";
import Post from "../post/postModel";

export const createUserService = async (userId: string, data: UsersI) => {
  const getUser = await User.findById(userId);
  if (!getUser || (getUser.role !== "SuperAdmin" && getUser.role !== "Admin")) {
    throw new Error("Only Super Admin or adminperform this action.");
  }
  const validateData = await userSchema.validate(data);
  const existingUser = await User.findOne({ email: validateData.email });
  if (existingUser) {
    throw new Error("User with this email already exists");
  }
  const hashedPassword = await bcrypt.hash(validateData.password, 10);
  const paylaod = {
    ...validateData,
    password: hashedPassword,
  };
  const user = await User.create(paylaod);
  return { user, message: "User created successfully", success: true };
};

export const getAllUserService = async (
  page: number,
  limit: number,
  search: string
) => {
  const skip = (page - 1) * limit;
  const query: any = {};
  if (search) {
    query.name = { $regex: search, $options: "i" };
  }
  const users = await User.find(query).skip(skip).limit(limit);
  const totalUsers = await User.countDocuments(query);
  const totalPages = Math.ceil(totalUsers / limit);
  return {
    users,
    totalUsers,
    totalPages,
    currentPage: page,
    message: "Users fetched successfully",
  };
};

export const getLoggedInUserService = async (userId: string) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }
  return { user, message: "User fetched successfully" };
};

export const getUserByIdUserService = async (userId: string) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }

  const getUserPosts = await Post.find({ author_id: userId });

  return {
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      posts: getUserPosts,
    },
    message: "User and posts fetched successfully",
  };
};

export const deleteUserService = async (userId: string, id: string) => {
  const getUser = await User.findById(userId);
  if (!getUser) {
    throw new Error("User not found");
  }

  if (getUser.role !== "SuperAdmin" && getUser.role !== "Admin") {
    throw new Error("Only Super Admin or Admin can perform this action.");
  }

  if (id === userId) {
    throw new Error("You cannot delete your own account.");
  }

  const userToDelete = await User.findByIdAndDelete(id);
  if (!userToDelete) {
    throw new Error("User not found to delete");
  }

  return {
    user: userToDelete,
    message: "User deleted successfully",
    success: true,
  };
};

export const updateUserService = async (userId: string, data: UsersI) => {
  const getUser = await User.findById(userId);
  if (!getUser) {
    throw new Error("User not found");
  }
  const paylaod = {
    name: data.name,
    role: data.role,
  };
  const user = await User.findByIdAndUpdate(data._id, paylaod, { new: true });
  if (!user) {
    throw new Error("User not found to update");
  }

  return { user, message: "User updated successfully", success: true };
};
