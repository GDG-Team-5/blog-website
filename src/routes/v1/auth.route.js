import express from "express";
import { authController } from "../../controllers/index.js";
import { protectRoute, checkUser } from "../../middlewares/index.js";

const Router = express.Router();

Router.route("/register").post(authController.register);
Router.route("/login").post(authController.login);
Router.route("/logout").post(authController.logout);
Router.route("/reset-password").post(authController.resetPassword);
Router.route("/reset-password/request").post(
  checkUser,
  authController.handlePasswordResetRequest
);
// Router.route("/google").post("")

export default Router;
