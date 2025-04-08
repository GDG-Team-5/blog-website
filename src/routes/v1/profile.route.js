import express from "express";
import { userController } from "../../controllers/index.js";

const Router = express.Router();
Router.route("profile")
  .get(userController.getProfile)
  .put(userController.updateUserName);
export default Router;
