import { createAction } from 'typesafe-actions';
import { IVideoData } from '../store';

export interface IRequsetLoginPayload {
  email: string;
  password: string;
}
export interface IRequsetSignUpPayload extends IRequsetLoginPayload {
  name: string;
}
export interface IVideoUploadPayload {
  formData: FormData;
  title: string;
  description: string;
}
export interface ISuccessLogin {
  user_id: string;
  email: string;
  token: string;
  name: string;
}
export interface IRequestLikePayload {
  user_id: string;
  video_id: string;
  like: boolean;
}

export interface IRequestCommentPayload {
  username: string;
  contents: string;
  video_id: string;
  comment_id: string;
}

export const successAuth = createAction('@command/user/successAuth')<
  ISuccessLogin
>();
export const requestLogin = createAction('@command/user/login')<
  IRequsetLoginPayload
>();
export const successLogin = createAction('@command/user/successLogin')<
  ISuccessLogin
>();
export const requestLogout = createAction('@command/user/requestLogout')();
export const successLogout = createAction('@command/user/successLogout')();
export const requestSignUp = createAction('@command/user/requsetSignUp')<
  IRequsetSignUpPayload
>();
export const requestVideoUpload = createAction('@command/video/upload')<
  FormData
>();
export const successGetAllVideos = createAction(
  '@command/video/successgetallVideos'
)<Array<IVideoData>>();

export const requestGetOneVideo = createAction(
  '@command/video/requestGetOneVideo'
)<string>();
export const successGetOneVideo = createAction(
  '@command/video/successGetOneVideo'
)<IVideoData>();

export const requestLikeVideo = createAction('@command/video/requestlike')<
  IRequestLikePayload
>();

export const requestComment = createAction('@command/video/requestcomment')<
  IRequestCommentPayload
>();
export const requestDeleteComment = createAction('@command/video/requestlike')<
  string
>();
