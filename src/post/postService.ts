import { PostI } from "../type";
import User from "../users/userModel";
import Post from "./postModel";
import { createPostSchema, updatePostSchema } from "./postValidation";
import dotenv from "dotenv";

dotenv.config();

export const createPostService = async (
  userId: string,
  data: PostI,
  imageFile?: Express.Multer.File
) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }
  const validateData = await createPostSchema.validate(data);
  let imageUrl = "";
  if (imageFile) {
    const imagePath = `/uploads/${imageFile.filename}`;
    imageUrl = imagePath;
  }
  const post = await Post.create({
    ...validateData,
    author_id: userId,
    image: `${process.env.API_URL}${imageUrl}`,
  });
  return { post, message: "Post created successfully", success: true };
};

export const updatePostService = async (
  data: PostI,
  postId: string,
  imageFile?: Express.Multer.File
) => {
  const post = await Post.findById(postId);
  if (!post) {
    throw new Error("Post not found");
  }
  const validateData = await updatePostSchema.validate(data);
  if (imageFile) {
    const imagePath = `/uploads/${imageFile.filename}`;
    post.image = imagePath;
  }

  const updatedPost = await Post.findByIdAndUpdate(
    postId,
    { ...validateData, image: post.image },
    { new: true }
  );

  return { updatedPost, message: "Post updated successfully" };
};

// export const getAllUserPostService = async (userId: string, page: number, limit: number, search: string) => {
//   const user = await User.findById(userId);
//   if (!user) {
//     throw new Error("User not found");
//   }

//   const query: any = { author_id: userId };
//   if (search) {
//     query.title = { $regex: search, $options: 'i' };
//   }

//   const skip = (page - 1) * limit;

//   const posts = await Post.find(query)
//     .skip(skip)
//     .limit(limit)
//     .populate('author_id', 'name email');

//   const totalPosts = await Post.countDocuments(query);
//   const totalPages = Math.ceil(totalPosts / limit);

//   return {
//     posts,
//     totalPosts,
//     totalPages,
//     currentPage: page,
//     message: "Posts fetched successfully",
//   };
// };

export const getAllUserPostService = async (
  userId: string,
  page: number,
  limit: number,
  search: string
) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }
  const query: any = {};

  if (user.role === "User") {
    query.author_id = userId;
  }

  if (search) {
    query.title = { $regex: search, $options: "i" };
  }

  const skip = (page - 1) * limit;
  const posts = await Post.find(query)
    .skip(skip)
    .limit(limit)
    .populate("author_id", "name email");

  const totalPosts = await Post.countDocuments(query);
  const totalPages = Math.ceil(totalPosts / limit);

  return {
    posts,
    totalPosts,
    totalPages,
    currentPage: page,
    message: "Posts fetched successfully",
  };
};

export const deletePostService = async (postId: string) => {
  const post = await Post.findByIdAndDelete(postId);
  if (!post) {
    throw new Error("Post not found");
  }
  return { post, message: "Post deleted successfully", success: true };
};
