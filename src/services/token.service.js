import jwt from "jsonwebtoken";
import { DateTime } from "luxon";
import { envVar } from "../configs/env.variable.js";
import { CustomError } from "../utils/index.js";
import { Token } from "../models/index.js";
import { tokenTypes } from "../configs/token.types.js";
const { sign, verify } = jwt;

const generateToken = (id, tokenType, expiresIn) => {
  const payload = {
    sub: id,
    type: tokenType,
    iat: DateTime.now().toUnixInteger(),
    exp: expiresIn.toUnixInteger(),
  };
  return sign(payload, envVar.token.jwtSecret);
};

const verifyToken = (token) => {
  const decoded = verify(token, envVar.token.jwtSecret);
  if (!decoded) {
    throw new CustomError(403, "Unauthorized - Invalid token.", true);
  }
  return decoded;
};

const saveToken = async (userId, token, tokenType) => {
  const savedToken = await Token.create({
    token: token,
    user: userId,
    type: tokenType,
    blacklisted: false,
  });
  if (!savedToken) {
    throw new CustomError(403, "token creation error.", false);
  }
  return savedToken;
};

const generateResetToken = async (userId) => {
  const tokenType = tokenTypes.resetPassword;
  const expiresIn = DateTime.now().plus({
    seconds: envVar.token.resetPasswordToknExp,
  });
  const resetToken = generateToken(userId, tokenType, expiresIn);
  return resetToken;
};
export default { generateToken, verifyToken, generateResetToken };
