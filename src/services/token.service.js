import jwt from "jsonwebtoken";
import { envVar } from "../configs/env.variable.js";
import { CustomError } from "../utils/index.js";
import { User, Token } from "../models/index.js";
import { userService } from "../services/index.js";
const { sign, verify } = jwt;
const generateToken = (id, tokenType, expiresIn, res) => {
  const payload = {
    sub: id,
    type: tokenType,
    iat: Date.now().toUnixInteger(),
    exp: expiresIn.toUnixInteger(),
  };

  //updated
  const token = sign(payload, envVar.token.jwtSecret);

  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 3600 * 1000,
    httpOnly: true,
    sameSite: "strict",
    secure: envVar.env !== "development",
  });
  return token;
};

const verifyToken = async (token) => {
  const decoded = verify(token, envVar.token.jwtSecret);
  if (!decoded) {
    throw new CustomError(403, "Unauthorized - Invalid token.", true);
  }
  return decoded;
};

const saveToken = async (userId, token) => {
  //implement the logic to save the token in the database
};

export default { generateToken, verifyToken };
