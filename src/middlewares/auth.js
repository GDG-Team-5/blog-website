import { tokenService, userService } from "../services/index.js";
const protectRoute = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = tokenService.verifyToken(token);
    req.user = await userService.getUserById(decoded.sub);
    next();
  } catch (error) {
    next(error);
  }
};
const checkUser = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await userService.getUserByEmail(email);
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
export { protectRoute, checkUser };
