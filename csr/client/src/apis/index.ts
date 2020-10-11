import axios, { AxiosError, AxiosResponse } from 'axios';
const endpoint = 'http://localhost:4000';

export const requestAuth = () =>
  new Promise((resolve, reject) => {
    axios
      .get(endpoint + '/user/auth', { withCredentials: true })
      .then((response: AxiosResponse) => resolve(response))
      .catch((error: AxiosError) => reject(error));
  });
export const requestLogin = (email: string, password: string) =>
  new Promise((resolve, reject) => {
    console.log({ email, password });
    axios
      .post(
        endpoint + '/user/login',
        { email, password },
        { withCredentials: true }
      )
      .then((response: AxiosResponse) => resolve(response))
      .catch((error: AxiosError) => reject(error));
  });

export const requestSignUp = (email: string, password: string, name: string) =>
  new Promise((resolve, reject) => {
    console.log({ email, password, name });
    axios
      .post(endpoint + '/user/signup', { email, password, name })
      .then((response: AxiosResponse) => resolve(response))
      .catch((error: AxiosError) => reject(error));
  });

export const requestVideoUpload = (formData: FormData) =>
  new Promise((resolve, reject) => {
    axios
      .post(endpoint + '/video/upload', formData, {
        headers: { 'content-type': 'multipart/form-data' },
      })
      .then((response: AxiosResponse) => resolve(response))
      .catch((error: AxiosError) => reject(error));
  });
