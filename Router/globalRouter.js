import express from "express";
import routes from "../routes";
import {
  home,
  join,
  login,
  logout,
  postJoin,
} from "../controller/userController";
import { search } from "../controller/videoController";
const globalRouter = express.Router();

globalRouter.get(routes.home, home);
globalRouter.get(routes.search, search);
globalRouter.get(routes.join, join);
globalRouter.post(routes.join, postJoin);
globalRouter.get(routes.login, login);
globalRouter.post(routes.login, login);
globalRouter.get(routes.logout, logout);

export default globalRouter;
