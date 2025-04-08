import { User } from "../models/index.js";
import { tokenService } from "../services/index.js";
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
    throw new CustomError(400, "No user found with this id", true);
  }
  return user;
};

const getUserProfile = async (id) => {
  const user = await getUserById(id);
  return user;
};

const updateUserName = async (id, userName) => {
  const user = await User.findById(id);
  if (!user) {
    throw new CustomError(400, "No user found with this id", true);
  }
  user.userName = userName;
  const updatedUser = await user.save();

  if (!updatedUser) {
    throw new CustomError(400, "Failed to update user name", true);
  }
  return updatedUser;
};

export default { getUserByEmail, getUserById, getUserProfile, updateUserName };
