<<<<<<< HEAD
import { User } from "../models/index.js";
import { CustomError, handleCatchError } from "../utils/index.js";

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
  return { message: "Login successful", token: "" };
};

const logout = async (id) => {
  //implemtent logout functionality here
  //for now we will just return a message
  return { message: "Logout successful" };
};

export default { register, login, logout };
=======
import { User } from "../models/index.js";
import { CustomError, handleCatchError } from "../utils/index.js";

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
  return { message: "Login successful", token: "" };
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

export default { register, login, logout };
>>>>>>> d7ecc22599000fdc65845647780015dc7cb8f7b8
