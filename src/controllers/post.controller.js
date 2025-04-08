import { postService } from "../services/index.js";
import { handleCatchError } from "../utils/index.js";

const createPost = handleCatchError(async (req, res) => {
  const authorId = req.user.id;
  const post = await postService.createPost(req.body, authorId);
  res.status(201).json(post);
});

const getAllPosts = handleCatchError(async (req, res) => {
  const posts = await postService.getAllPosts();
  res.status(200).json(posts);
});

const updatePost = handleCatchError(async (req, res) => {
  const postId = req.params.id;
  const updatedPost = await postService.updatePost(postId, req.body);
  res.status(200).json(updatedPost);
});

const deletePost = handleCatchError(async (req, res) => {
  const postId = req.params.id;
  await postService.deletePost(postId);
  res.status(204).json({ message: "Post deleted successfully" });
});

export default { createPost, getAllPosts, updatePost, deletePost };
