//authentication and autherization middleware goes here

import { tokenService } from "../services/index.js";
export const protectRout = async (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return res
      .status(403)
      .json({ message: "Unauthorized - no token provided." });
  }
  req.user = await tokenService.verifyToken(token);
  next();
};
