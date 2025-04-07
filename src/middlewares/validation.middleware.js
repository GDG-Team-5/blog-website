//validate middleware goes here
// /src/middleware/validation.middleware.js (example)
import { validationResult } from 'express-validator';
import { CustomError } from '../utils/index.js';

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const message = errors.array().map(err => err.msg).join(', ');
    return next(new CustomError(400, `Validation error: ${message}`, true));
  }
  next();
};

export { validate };