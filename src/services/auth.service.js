import { User } from "../models/index.js";
import { CustomError } from "../utils/index.js";

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

export default { register };
