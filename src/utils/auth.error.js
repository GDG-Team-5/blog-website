<<<<<<< HEAD
import CustomError from "./custom.error.js";
// define object of authentication errors related to token-based authentication
const authenticationErrorHandlers = {
  UnauthorizedError: () =>
    new CustomError(401, "you are not authenticated", true),
  ForbiddenError: () =>
    new CustomError(403, " you don't have permision to acccess", true),
  JsonWebTokenError: () => new CustomError(401, "Invalid token", true),
  TokenExpiredError: () => new CustomError(401, "Token Expires", true),
};
export default authenticationErrorHandlers;
=======
import CustomError from "./custom.error.js";
// define object of authentication errors related to token-based authentication
const authenticationErrorHandlers = {
  UnauthorizedError: () =>
    new CustomError(401, "you are not authenticated", true),
  ForbiddenError: () =>
    new CustomError(403, " you don't have permision to acccess", true),
  JsonWebTokenError: () => new CustomError(401, "Invalid token", true),
  TokenExpiredError: () => new CustomError(401, "Token Expires", true),
};
export default authenticationErrorHandlers;
>>>>>>> d7ecc22599000fdc65845647780015dc7cb8f7b8
