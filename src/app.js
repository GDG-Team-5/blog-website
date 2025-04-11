import express from "express";
import cors from "cors";
import morgan from "morgan";
import { CustomError } from "./utils/index.js";
import { errorHandler } from "./middlewares/index.js";
import APIRoute from "./routes/v1/index.js";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "./configs/passprt.js";
import { envVar } from "./configs/env.variable.js";
import { morganFormat, stream } from "./configs/request.logger.js";
const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan(morganFormat, { stream }));
app.use(
  session({
    secret: envVar.session.secret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: envVar.env === "production",
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: "strict",
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/v1", APIRoute);

//unknown api handler
app.all("/*unknown", (req, res, next) => {
  const message = `${req.originalUrl} not found`;
  const statusCode = 404;
  const error = new CustomError(statusCode, message, true);
  next(error);
});

app.use(errorHandler.convertError);
app.use(errorHandler.handleGlobalError);

export default app;
