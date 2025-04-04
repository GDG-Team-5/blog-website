import Joi from "joi";
const envSchema = Joi.object()
  .keys({
    PORT: Joi.number().default(3000).description("port number"),
    DB_UR: Joi.string()
      .default("mongodb://localhost:27017/blog-website")
      .description("mongodb url"),
    NODE_ENV: Joi.string().default("production").required(),
    ACESS_TOKEN_EXPIRES_IN_MINUTES: Joi.number().required(),
    REFRESH_TOKEN_EXPIRES_IN_DAYS: Joi.number().required(),
    RESET_PASSWORD_TOKEN_EXPIRES_IN_MINUTE: Joi.number().required(),
    EMAIL_VERIFICATION_TOKEN_EXPIRES_IN_SECONDS: Joi.number().required(),
  })
  .unknown();
export default envSchema;
