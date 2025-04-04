class CustomError extends Error {
  constructor(statusCode, message, isOperational = false) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    Error.captureStackTrace(this, this.constructor);
  }
}

export default CustomError;
