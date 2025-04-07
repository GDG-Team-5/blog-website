import { User } from "../models/index.js";
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

export default { getUserByEmail, getUserById };
