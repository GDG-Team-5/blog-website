import express from "express";
import { authController } from "../../controllers/index.js";

const Router = express.Router();

Router.route("/register").post(authController.register);

export default Router;
