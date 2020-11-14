import { createAction } from 'typesafe-actions';
import { IAuthentication, IVideoData } from '../store';

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
  imageUrl: string;
}
export interface IRequestLikePayload {
  user_id: string;
  video_id: string;
  like: boolean;
}

export interface IRequestCommentPayload {
  user_id: string;
  contents: string;
  video_id: string;
  comment_id: string;
}

export interface IrequestDeleteVideo {
  user_id: string;
  video_id: string;
}

export interface IrequestDeleteComment {
  video_id: string;
  parrentComment_id: string;
  comment_id: string;
}

export const successAuth = createAction('@command/user/successAuth')<
  ISuccessLogin
>();

export const requestLogin = createAction('@command/user/requestLogin')<
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

export const requestGetAllVideos = createAction(
  '@command/video/requestgetallVideos'
)();

export const successGetAllVideos = createAction(
  '@command/video/successgetallVideos'
)<Array<IVideoData>>();

export const requestGetOneVideo = createAction(
  '@command/video/requestGetOneVideo'
)<string>();
export const successGetOneVideo = createAction(
  '@command/video/successGetOneVideo'
)<IVideoData>();

export const requestGetUserAllVideos = createAction(
  '@command/user/requestGetUserAllVideos'
)<string>();

export const requestClearUserAllVideos = createAction(
  '@command/user/requestClearUserAllVideos'
)();

export const successGetUserAllVideos = createAction(
  '@command/user/successGetUserAllVideos'
)<Array<IVideoData>>();

export const requestClearOneVideo = createAction(
  '@command/video/requestClearOneVideo'
)();

export const requestLikeVideo = createAction('@command/video/requestlike')<
  IRequestLikePayload
>();

export const requestComment = createAction('@command/video/requestcomment')<
  IRequestCommentPayload
>();

export const requestDeleteVideo = createAction(
  '@command/video/requestDeleteVideo'
)<IrequestDeleteVideo>();

export const requestDeleteComment = createAction(
  '@command/video/requestDeleteComment'
)<IrequestDeleteComment>();
