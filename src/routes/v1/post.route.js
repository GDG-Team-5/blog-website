import express from "express";
import { protectRoute, validate } from "../../middlewares/index.js";
import { postController } from "../../controllers/index.js";
import { postValidation } from "../../validations/index.js";

const Router = express.Router();
Router.route("/")
  .post(
    validate(postValidation.postCreateSchema),
    protectRoute,
    postController.createPost
  )
  .get(postController.getAllPosts);

Router.route("/:id")
  .put(
    validate(postValidation.postUpdateSchema),
    protectRoute,
    postController.updatePost
  )
  .delete(
    validate(postValidation.postDeleteSchema),
    protectRoute,
    postController.deletePost
  );
export default Router;
