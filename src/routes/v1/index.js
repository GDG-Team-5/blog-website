import express from "express";
import authRouter from "./auth.route.js";
const Router = express.Router();
const routes = [
  {
    path: "/auth",
    route: authRouter,
  },
];
routes.forEach((route) => {
  Router.use(route.path, route.route);
});

export default Router;
