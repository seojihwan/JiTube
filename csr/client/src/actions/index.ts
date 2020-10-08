import { createAction } from 'typesafe-actions';

export const requestLogin = createAction('@command/login')<{
  email: string;
  password: string;
}>();
export const requestLogout = createAction('@command/logout')<string>();
export const successLogin = createAction('@command/successLogin')<string>();
