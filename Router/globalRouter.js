import express from "express";
import routes from "../routes";
import {
  join,
  login,
  logout,
  postJoin,
  postLogin,
} from "../controller/userController";
import { search, upload, home } from "../controller/videoController";
const globalRouter = express.Router();

globalRouter.get(routes.home, home);
globalRouter.get(routes.search, search);

globalRouter.get(routes.join, join);
globalRouter.post(routes.join, postJoin, postLogin);
globalRouter.get(routes.login, login);
globalRouter.post(routes.login, postLogin);
globalRouter.get(routes.logout, logout);

export default globalRouter;
