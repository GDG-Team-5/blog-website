import mongoose from "mongoose";
//define function to validate password
const validatePassword = (value, helpers) => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
  if (!passwordRegex.test(value)) {
    return helpers.message(
      "Password must contain at least one uppercase letter, one lowercase letter, and one number."
    );
  }
  return value;
};

const validateObjectId = (value, helpers) => {
  if (!value.match(/^[0-9a-fA-F]{24}$/)) {
    return helpers.message('"{{#label}}" must be a valid Id');
  }
  return value;
};

export { validatePassword, validateObjectId };
