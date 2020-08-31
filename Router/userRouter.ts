import express from 'express';
import routes from '../routes';
import {
  user,
  user_detail,
  editProfile,
  postEditProfile,
  getChangePassword,
  postChangePassword,
} from '../controller/userController';
import { onlyPrivate, uploadAvatar } from '../middleWares';
const userRouter = express.Router();
userRouter.get(routes.edit_profile, onlyPrivate, editProfile);
userRouter.post(routes.edit_profile, onlyPrivate, uploadAvatar, postEditProfile);
userRouter.get(routes.change_password, onlyPrivate, getChangePassword);
userRouter.post(routes.change_password, onlyPrivate, postChangePassword);
userRouter.get(routes.user_detail(), user_detail);
export default userRouter;
