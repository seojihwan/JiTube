import { createAction } from 'typesafe-actions';
import { UserDocument } from '../../../server/models';
import { IVideo } from '../store';

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
export const successGetAllVideos = createAction('@command/video/getall')<
  Array<IVideo>
>();
