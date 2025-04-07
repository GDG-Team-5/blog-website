<<<<<<< HEAD
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

const saveToken = async (userId, token) => {
  //implement the logic to save the token in the database
};

export default { generateToken };
=======
import jwt from "jsonwebtoken";
import { envVar } from "../configs/env.variable.js";
import { CustomError } from "../utils/index.js";
import { User, Token } from "../models/index.js";
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
    secure: process.env.NODE_ENV !== "development",
  });
  return token;
};

const verifyToken = async (token) => {
  try {
    const decoded = verify(token, envVar.token.jwtSecret);

    //update
    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized - Invalid token." });
    }

    const user = await User.findById(decoded.sub);
    if (!user) {
      throw new CustomError(401, "User not found", true);
    }
    return user;
  } catch (error) {
    throw new CustomError(401, "Invalid token", true);
  }
};

const saveToken = async (userId, token) => {
  //implement the logic to save the token in the database
};

export default { generateToken, verifyToken };
>>>>>>> d7ecc22599000fdc65845647780015dc7cb8f7b8
