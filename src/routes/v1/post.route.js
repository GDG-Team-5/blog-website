import { protectRoute } from "../../middlewares/index.js";
import { postController } from "../../controllers/index.js";
import express from "express";

const Router = express.Router();
Router.route("/")
  .post(protectRoute, postController.createPost)
  .get(protectRoute, postController.getAllPosts);

Router.route("/:id")
  .put(protectRoute, postController.updatePost)
  .delete(protectRoute, postController.deletePost);
export default Router;
