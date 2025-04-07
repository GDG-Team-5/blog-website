<<<<<<< HEAD
class CustomError extends Error {
  constructor(statusCode, message, isOperational = false) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    Error.captureStackTrace(this, this.constructor);
  }
}

export default CustomError;
=======
class CustomError extends Error {
  constructor(statusCode, message, isOperational = false) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    Error.captureStackTrace(this, this.constructor);
  }
}

export default CustomError;
>>>>>>> d7ecc22599000fdc65845647780015dc7cb8f7b8
