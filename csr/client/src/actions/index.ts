import { createAction } from 'typesafe-actions';

export interface IrequsetLoginPayload {
  email: string;
  password: string;
}
export interface IrequsetSignUpPayload extends IrequsetLoginPayload {
  name: string;
}
export const requestLogin = createAction('@command/login')<
  IrequsetLoginPayload
>();
export const successLogin = createAction('@command/successLogin')<string>();
export const requestLogout = createAction('@command/requestLogout')();
export const successLogout = createAction('@command/successLogout')();

export const requestSignUp = createAction('@command/requsetSignUp')<
  IrequsetSignUpPayload
>();
