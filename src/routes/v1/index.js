import { Router } from "express";
import authRouter from "./auth.router.js";

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
