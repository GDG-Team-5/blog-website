import Joi from "joi";
const regeisterSchema = {
  body: Joi.object().keys({
    userName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string()
      .min(8)
      .default("Password1234")
      .custom(validatePassword),
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
const resetFormSchema = {
  query: Joi.object().keys({
    token: Joi.string().email().required(),
  }),
};

export {
  regeisterSchema,
  loginSchema,
  resetFormSchema,
  resetRequestSchema,
  resetPasswordSchema,
};
