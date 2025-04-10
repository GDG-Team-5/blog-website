import logError from "./error.logger.js";
//This function is used to catch errors in async functions and pass them to the next middleware
const handleCatchError = (func) => (req, res, next) => {
  Promise.resolve(func(req, res, next)).catch((error) => {
    logError(error);
    return next(error);
  });
};

export default handleCatchError;
