//authentication and autherization middleware goes here

import { verifyToken } from "../services/token.service.js";

export const protectRout = async (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorized - no token provided." });
  }
  req.user = await verifyToken(token);
  next();
};
