import { use } from "passport";
import { User } from "../models/index.js";
import { tokenService, userService } from "../services/index.js";
import { CustomError } from "../utils/index.js";

const getUserByEmail = async (email) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new CustomError(400, `No user found with ${email} `, true);
  }
  return user;
};

const getUserById = async (id) => {
  const user = await User.findById(id);
  if (!user) {
    throw new CustomError(400, "No user found with this id");
  }
  return user;
};

const getUserProfile = async (token) => {
  const decoded = tokenService.verifyToken(token);
  const user = await getUserById(decoded.id);
  return user;
};

const updateUserName = async (id, userName) => {
  const updatedUser = await User.findByIdAndUpdate(
    id,
    { userName },
    { new: true, runValidators: true }
  );
  if (!updatedUser) {
    throw new CustomError(400, "No user found with this id");
  }
  return updatedUser;
};

export default { getUserByEmail, getUserById, getUserProfile, updateUserName };
