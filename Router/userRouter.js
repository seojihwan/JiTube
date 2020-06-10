import express from "express";
import routes from "../routes";
import {
  user,
  user_detail,
  edit_profile,
  change_password,
} from "../controller/userController";
import { home } from "../controller/videoController";
import { onlyPrivate } from "../middleWares";
const userRouter = express.Router();

userRouter.get(routes.home, home);
userRouter.get(routes.edit_profile, onlyPrivate, edit_profile);
userRouter.get(routes.change_password, onlyPrivate, change_password);
userRouter.get(routes.user_detail(), user_detail);
export default userRouter;
