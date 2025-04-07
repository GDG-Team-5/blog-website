import express from "express";
import { authController } from "../../controllers/index.js";
import { protectRoute } from "../../middlewares/auth.js";
import { requestingUser } from "../../middlewares/passwordReset.middleware.js";

const Router = express.Router();

Router.route("/register").post(authController.register);
Router.route("/login").post(authController.login);
Router.route("/logout").post(authController.logout);

Router.route("/reset-password/request").post(
  requestingUser,
  authController.passwordResetRequest
);

Router.route("/reset-password").post(
  requestingUser,
  authController.resetPassword
);

export default Router;
