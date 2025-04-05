import jwt from "jsonwebtoken";
import { envVar } from "../configs/env.variable.js";
import { CustomError } from "../utils/index.js";
import { User } from "../models/index.js";
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

export default { generateToken };
