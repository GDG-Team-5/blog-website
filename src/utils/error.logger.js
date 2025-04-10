import logger from "../configs/wins.logger.js";
const logError = (error) => {
  logger.errorLogger.error("Error Details", {
    errorName: error.name,
    message: error.message,
    stack: error.stack,
  });
};

export default logError;
