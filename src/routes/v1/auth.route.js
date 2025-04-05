import express from "express";
import { authController } from "../../controllers/index.js";

const Router = express.Router();

Router.route("/register").post(authController.register);
Router.route("/login").post(authController.login);
Router.route("/logout").post(authController.logout);

export default Router;
