import express from "express";
import routes from "../routes";
import {
  home,
  join,
  login,
  logout,
  postJoin,
  postLogin,
} from "../controller/userController";
import { search, upload } from "../controller/videoController";
const globalRouter = express.Router();

globalRouter.get(routes.home, home);
globalRouter.get(routes.search, search);
globalRouter.get(routes.upload, upload);

globalRouter.get(routes.join, join);
globalRouter.post(routes.join, postJoin);
globalRouter.get(routes.login, login);
globalRouter.post(routes.login, postLogin);
globalRouter.get(routes.logout, logout);

export default globalRouter;
