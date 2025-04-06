import express from "express";
import { CustomError } from "./utils/index.js";
import { errorHandler } from "./middlewares/index.js";
import APIRoute from "./routes/v1/index.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
