import express from "express";
import authRouter from "./auth.route.js";
import profileRoute from "./profile.route.js";
const Router = express.Router();
const routes = [
  {
    path: "/auth",
    route: authRouter,
  },
  {
    path: "/profile",
    route: profileRoute,
  },
];
routes.forEach((route) => {
  Router.use(route.path, route.route);
});

export default Router;
