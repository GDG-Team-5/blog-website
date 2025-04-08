import { MongooseError } from "mongoose";
import {
  CustomError,
  mongooseErrorHandlers,
  genericErrorHandlers,
  authenticationErrorHandlers,
} from "../utils/index.js";

//define global error converter
const convertError = (error, req, res, next) => {
  //check if error is custom error
  if (error instanceof CustomError) {
    return next(error);
  }
  //check if error is mongoose error
  if (error instanceof MongooseError) {
    const handleError =
      mongooseErrorHandlers[error.name] || mongooseErrorHandlers.unknownError;
    const { statusCode, message, isOperational } = handleError(error);
    return next(new CustomError(statusCode, message, isOperational));
  }
  //check if the error is found in the authentication error
  if (error.name in authenticationErrorHandlers) {
    return next(authenticationErrorHandlers[error.name]());
  }
  //check if the error is found in the generic errors
  if (error.name in genericErrorHandlers) {
    return next(genericErrorHandlers[error.name]());
  }
  //log for unknown errors
  next(new CustomError(500, "something went wrong", true));
};
//define global error handler
const handleGlobalError = (error, req, res, next) => {
  const response = {
    message:
      error.isOperational === false ? "something went wrong" : error.message,
    status: error.status,
  };
  console.error(error.message);
  res.status(error.statusCode).json(response);
};

export default { handleGlobalError, convertError };
