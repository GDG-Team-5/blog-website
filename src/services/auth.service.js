import { DateTime } from "luxon";
import { User } from "../models/index.js";
import { CustomError } from "../utils/index.js";
import tokenService from "./token.service.js";
import userService from "./user.service.js";
import { tokenTypes } from "../configs/token.types.js";
import { envVar } from "../configs/env.variable.js";
import emailService from "./email.service.js";

//Function to register a new user
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

//Function to login a user
const login = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new CustomError(400, "Invalid email or password", true);
  }
  const isMatch = await user.verifyPassword(password);
  if (!isMatch) {
    throw new CustomError(400, "Invalid email or password", true);
  }
  const token = tokenService.generateToken(
    user.id,
    tokenTypes.accessToken,
    DateTime.now().plus({ minutes: envVar.token.acessTokenExp })
  );
  return { message: "Login successfully", token: token };
};

const logout = async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
      return res.status(500).json({ message: "Failed to logout." });
    }
  });

  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.cookie("connect.sid", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.log("Error in logout controller", error.message);
  }
};

const handlePasswordResetRequest = async (email) => {
  const user = await userService.getUserByEmail(email);
  const resetToken = await tokenService.generateResetToken(user.id);
  await emailService.sendResetPasswordLink(email, resetToken);
  return { message: "Password reset link sent to your email." };
};

const resetPassword = async (token, newPassword) => {
  const decoded = await tokenService.verifyToken(token);
  const user = await User.findById(decoded.sub);
  if (!user) {
    throw new CustomError(400, "Invalid token", true);
  }
  user.password = newPassword;
  user.tokenExpiration = null;
  user.resetToken = null;
  await user.save();
  return { message: "Password reset successfully" };
};

export default {
  register,
  login,
  logout,
  handlePasswordResetRequest,
  resetPassword,
};
