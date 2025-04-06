import express from "express";
import { CustomError } from "./utils/index.js";
import { errorHandler } from "./middlewares/index.js";
import APIRoute from "./routes/v1/auth.route.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//api
app.use("/api/v1/auth", APIRoute);

//unknown api handler
app.use("*", (req, res, next) => {
  next(new CustomError(404, `${req.originalUrl} not found`, true));
});

//error handlers
app.use(errorHandler.convertError);
app.use(errorHandler.handleGlobalError);

export default app;
