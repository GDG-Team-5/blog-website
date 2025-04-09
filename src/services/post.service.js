import mongoose from "mongoose";
import { Post, User } from "../models/index.js";
import userService from "./user.service.js";
import { CustomError } from "../utils/index.js";

const addToUserFeed = async (user, postId) => {
  user.posts.push(postId);
  const updatedUser = await user.save();
  if (!updatedUser) {
    throw new CustomError(400, "Failed to update user feed", true);
  }
};

const removeFromUserFeed = async (authorId, postId) => {
  const user = await userService.getUserById(authorId);
  const postIdObjectId = new mongoose.Types.ObjectId(postId);
  user.posts = user.posts.filter((post) => !post.equals(postIdObjectId));
  const updatedUser = await user.save();
  if (!updatedUser) {
    throw new CustomError(400, "Failed to update user feed", true);
  }
};

const createPost = async (postData, authorId) => {
  const user = await userService.getUserById(authorId);
  postData.author = authorId;
  const post = await Post.create(postData);
  if (!post) {
    throw new CustomError(400, "Failed to create post", true);
  }
  await addToUserFeed(user, post.id);

  return post;
};

const getAllPosts = async () => {
  const posts = await Post.find({})
    .populate("author", "userName email")
    .sort({ createdAt: -1 });
  if (!posts) {
    throw new CustomError(400, "No posts found", true);
  }
  return posts;
};

const updatePost = async (postId, postData) => {
  const post = await Post.findById(postId);
  if (!post) {
    throw new CustomError(400, "No post found with this id", true);
  }
  Object.keys(postData).forEach((key) => {
    post[key] = postData[key];
  });
  const updatedPost = await post.save();
  if (!updatedPost) {
    throw new CustomError(400, "Failed to update post", true);
  }
  return updatedPost;
};

const deletePost = async (postId) => {
  const deletedPost = await Post.findByIdAndDelete(postId);
  if (!deletedPost) {
    throw new CustomError(400, "No post found with this id", true);
  }
  await removeFromUserFeed(deletedPost.author, postId);
  return deletedPost;
};

export default { createPost, getAllPosts, updatePost, deletePost };
