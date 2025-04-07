import { config } from "dotenv";
import { resolve } from "path";
import { fileURLToPath } from "url";
import { envSchema } from "../validations/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = resolve(__filename, "..", "..", "src", "configs");
const envFilePath = resolve(__dirname, "..", "..", "..", ".env");
config({ path: envFilePath });

const { value: env, error } = envSchema
  .prefs({ errors: { label: "key" } })
  .validate(process.env);
if (error) {
  throw new Error(`Environment validation error: ${error.message}`);
}

export const envVar = {
  port: env.PORT || 3000,
  dataBaseUrl: env.DB_URL,
  env: env.NODE_ENV,
  serverUrl: env.SERVER_URL,
  token: {
    acessTokenExp: env.ACESS_TOKEN_EXPIRES_IN_MINUTES,
    refreshTokenExp: env.REFRESH_TOKEN_EXPIRES_IN_DAYS,
    resetPasswordToknExp: env.RESET_PASSWORD_TOKEN_EXPIRES_IN_MINUTES,
    emailVerificationTokenEXp: env.EMAIL_VERIFICATION_TOKEN_EXPIRES_IN_SECONDS,
    jwtSecret: env.JWT_SECRET_KEY,
  },
  mailtrap: {
    userName: env.MAILTRAP_USERNAME,
    password: env.MAILTRAP_PASSWORD,
    host: env.MAILTRAP_HOST,
    port: env.MAILTRAP_PORT,
  },
  googeClient: {
    id: env.GOOGLE_CLIENT_ID,
    secret: env.GOOGLE_CLIENT_SECRET,
  },
  session: {
    secret: env.SESSION_SECRET,
  },
};
