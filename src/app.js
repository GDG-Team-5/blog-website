import express from "express";
import { CustomError } from "./utils/index.js";
import { errorHandler } from "./middlewares/index.js";
import APIRoute from "./routes/v1/index.js";
import cookieParser from "cookie-parser";
import session from "express-session";
import { initializeGoogleAuth } from "./controllers/auth.controller.js";
import passport from "passport";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET || "super-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: "strict",
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());
initializeGoogleAuth();

//api
app.use("/api/v1", APIRoute);

// //unknown api handler
app.all("/*unknown", (req, res, next) => {
  const message = `${req.originalUrl} not found`;
  const statusCode = 404;
  const error = new CustomError(statusCode, message, true);
  next(error);
});

//error handlers
app.use(errorHandler.convertError);
app.use(errorHandler.handleGlobalError);

export default app;
