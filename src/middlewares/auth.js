<<<<<<< HEAD
//authentication and autherization middleware goes here
=======
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
>>>>>>> d7ecc22599000fdc65845647780015dc7cb8f7b8
