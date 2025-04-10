import { MongooseError } from "mongoose";
import {
  CustomError,
  mongooseErrorHandlers,
  genericErrorHandlers,
  authenticationErrorHandlers,
  logError,
} from "../utils/index.js";

//define global error converter
const convertError = (error, req, res, next) => {
  if (error instanceof CustomError) {
    return next(error);
  }

  logError(error);

  if (error instanceof MongooseError) {
    const handleError =
      mongooseErrorHandlers[error.name] || mongooseErrorHandlers.unknownError;
    const { statusCode, message, isOperational } = handleError(error);
    return next(new CustomError(statusCode, message, isOperational));
  }

  if (error.name in authenticationErrorHandlers) {
    return next(authenticationErrorHandlers[error.name]());
  }

  if (error.name in genericErrorHandlers) {
    return next(genericErrorHandlers[error.name]());
  }
  next(new CustomError(500, "something went wrong", true));
};
//define global error handler
const handleGlobalError = (error, req, res, next) => {
  const response = {
    message:
      error.isOperational === false ? "something went wrong" : error.message,
    status: error.status,
  };
  res.status(error.statusCode).json(response);
};

export default { handleGlobalError, convertError };
