import { createAction } from 'typesafe-actions';

export interface IrequsetLoginPayload {
  email: string;
  password: string;
}
export interface IrequsetSignUpPayload extends IrequsetLoginPayload {
  name: string;
}
export const requestLogin = createAction('@command/user/login')<
  IrequsetLoginPayload
>();
export const successLogin = createAction('@command/user/successLogin')<
  string
>();
export const requestLogout = createAction('@command/user/requestLogout')();
export const successLogout = createAction('@command/user/successLogout')();
export const requestSignUp = createAction('@command/user/requsetSignUp')<
  IrequsetSignUpPayload
>();
export const requestVideoUpload = createAction('@command/video/upload')<
  FormData
>();
