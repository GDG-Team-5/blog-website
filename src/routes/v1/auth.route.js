import express from "express";
import { authController } from "../../controllers/index.js";
import { validate, checkUser } from "../../middlewares/index.js";
import { authValidator } from "../../validations/index.js";

const Router = express.Router();

Router.route("/register").post(
  validate(authValidator.regeisterSchema),
  authController.register
);
Router.route("/login").post(
  validate(authValidator.loginSchema),
  authController.login
);
Router.route("/logout").post(authController.logout);
Router.route("/reset-password/request").post(
  validate(authValidator.resetRequestSchema),
  checkUser,
  authController.handlePasswordResetRequest
);
Router.route("/reset-password-form").get(
  validate(authValidator.resetFormSchema),
  authController.sentResetPasswordForm
);
Router.route("/reset-password").post(
  validate(authValidator.resetPasswordSchema),
  authController.resetPassword
);
// Router.route("/google").post("")

export default Router;
