import express from "express";
import { userController } from "../../controllers/index.js";
import { protectRoute } from "../../middlewares/index.js";

const Router = express.Router();
Router.route("/")
  .get(protectRoute, userController.getProfile)
  .put(protectRoute, userController.updateUserName);
export default Router;
