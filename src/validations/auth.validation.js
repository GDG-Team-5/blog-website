import Joi from "joi";
import { validatePassword } from "./custom.validation.js";
const regeisterSchema = {
  body: Joi.object().keys({
    userName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string()
      .min(8)
      .default("Password1234")
      .custom(validatePassword)
      .required(),
  }),
};

const loginSchema = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
};

const resetRequestSchema = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
  }),
};

const resetPasswordSchema = {
  body: Joi.object().keys({
    token: Joi.string().required(),
    newPassword: Joi.string().min(8).custom(validatePassword),
  }),
};

export default {
  regeisterSchema,
  loginSchema,
  resetRequestSchema,
  resetPasswordSchema,
};
