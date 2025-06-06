import Joi from "joi";
const envSchema = Joi.object()
  .keys({
    PORT: Joi.number().default(3000).description("port number"),
    DB_URL: Joi.string()
      .default("mongodb://localhost:27017/blog-website")
      .description("mongodb url"),
    NODE_ENV: Joi.string().default("production").required(),
    ACESS_TOKEN_EXPIRES_IN_MINUTES: Joi.number().required(),
    REFRESH_TOKEN_EXPIRES_IN_DAYS: Joi.number().required(),
    RESET_PASSWORD_TOKEN_EXPIRES_IN_SECONDS: Joi.number().required(),
    EMAIL_VERIFICATION_TOKEN_EXPIRES_IN_SECONDS: Joi.number().required(),
    JWT_SECRET_KEY: Joi.string().required(),
    // MAILTRAP_USERNAME: Joi.string().required(),
    // MAILTRAP_PASSWORD: Joi.string().required(),
    // MAILTRAP_HOST: Joi.string().required(),
    //MAILTRAP_PORT: Joi.string().required(),

    EMAIL_HOST: Joi.string().required(),
    EMAIL_PORT: Joi.string().required(),
    EMAIL_SECURE: Joi.string().required(),
    EMAIL_FROM: Joi.string().required(),
    USER_EMAIL: Joi.string().required(),
    USER_PASSWORD: Joi.string().required(),
    APP_NAME: Joi.string().required(),

    GOOGLE_CLIENT_ID: Joi.string().required(),
    GOOGLE_CLIENT_SECRET: Joi.string().required(),
    SESSION_SECRET: Joi.string().required(),
    SERVER_URL: Joi.string().required(),

    LOG_FILE_PATH: Joi.string().required().description("log path"),
  })
  .unknown();
export default envSchema;
