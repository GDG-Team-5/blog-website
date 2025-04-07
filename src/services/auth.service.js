import { User } from "../models/index.js";
import { CustomError } from "../utils/index.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables if not already loaded

// Function to register a new user
const register = async (userData) => {
  const { userName, email, password } = userData;
  if (await User.isEmailUsed(email)) {
    throw new CustomError(400, "Email already exists", true);
  }
  const user = await User.create({ userName, email, password });
  if (!user) {
    throw new CustomError(400, "User registration failed", true);
  }
  return { message: "User registered successfully", user: user };
};

// Function to login a user
const login = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new CustomError(400, "Invalid email or password", true);
  }
  const isMatch = await user.verifyPassword(password);
  if (!isMatch) {
    throw new CustomError(400, "Invalid email or password", true);
  }

  // Generate JWT token
  const payload = { id: user._id }; // Include user ID in the payload
  const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.ACESS_TOKEN_EXPIRES_IN_MINUTES + "m", // Use the expiration time from .env
  });

  return { message: "Login successful", token };
};

const logout = async (id) => {
  // Implement logout functionality here (e.g., invalidating token)
  // For now, we will just return a message
  return { message: "Logout successful" };
};

export default { register, login, logout };
