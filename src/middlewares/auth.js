import { tokenService, userService } from "../services/index.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    const decoded = await tokenService.verifyToken(token);
    req.user = await userService.getUserById(decoded.sub);
    next();
  } catch (error) {
    next(error);
  }
};
