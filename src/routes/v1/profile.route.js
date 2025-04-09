import express from "express";
import { userController } from "../../controllers/index.js";
import { protectRoute, validate } from "../../middlewares/index.js";
import { userValidation } from "../../validations/index.js";

const Router = express.Router();
Router.route("/")
  .get(protectRoute, userController.getProfile)
  .put(
    validate(userValidation.updateUserSchema),
    protectRoute,
    userController.updateUserName
  );
export default Router;
