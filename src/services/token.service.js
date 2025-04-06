import jwt from "jsonwebtoken";
import { envVar } from "../configs/env.variable.js";
import { CustomError } from "../utils/index.js";
import { User, Token } from "../models/index.js";
const { sign, verify } = jwt;

const generateToken = (id, tokenType, expiresIn) => {
  const payload = {
    sub: id,
    type: tokenType,
    iat: Date.now().toUnixInteger(),
    exp: expiresIn.toUnixInteger(),
  };
  return sign(payload, envVar.token.jwtSecret);
};

const verifyToken = async (token) => {
  try {
    const decoded = verify(token, envVar.token.jwtSecret);
    const user = await User.findById(decoded.sub);
    if (!user) {
      throw new CustomError(401, "User not found", true);
    }
    return user;
  } catch (error) {
    throw new CustomError(401, "Invalid token", true);
  }
};

const saveToken = async (userId, token) => {};

export default { generateToken };
