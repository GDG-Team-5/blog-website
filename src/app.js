import express from "express";
import APIRoute from "./routes/v1/auth.route.js";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/auth", APIRoute);

export default app;
