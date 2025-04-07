import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { CustomError } from "../utils/index.js";

dotenv.config();

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(
      new CustomError(
        401,
        "Authentication required: Missing or invalid token",
        true
      )
    );
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.userId = decoded.id; // Attach the user ID from the token to the request object
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error("Token verification failed:", error);
    return next(
      new CustomError(401, "Authentication failed: Invalid token", true)
    );
  }
};

export { authenticate };
