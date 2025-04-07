import express from "express";
import authRoutes from "./auth.route.js";
import { authenticate } from "../../middlewares/auth.middleware.js"; 
import {
  getProfile,
  updateProfile,
  validateUpdateProfile,
} from "../../controllers/profile.controller.js"; 
import { validate } from "../../middlewares/validation.middleware.js";//general validation middleware 
const router = express.Router();


router.use("/auth", authRoutes);
router.get("/profile", authenticate, getProfile);
router.put('/profile', authenticate, validateUpdateProfile, validate, updateProfile);


export default router;

