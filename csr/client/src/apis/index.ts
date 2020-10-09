import axios, { AxiosError, AxiosResponse } from 'axios';
const endpoint = 'http://localhost:4000';

export const requsetLogin = (email: string, password: string) =>
  new Promise((resolve, reject) => {
    console.log({ email, password });
    axios
      .post(endpoint + '/login', { email, password })
      .then((response: AxiosResponse) => resolve(response))
      .catch((error: AxiosError) => reject(error));
  });
export const requsetSignUp = (email: string, password: string, name: string) =>
  new Promise((resolve, reject) => {
    console.log({ email, password, name });
    axios
      .post(endpoint + '/signup', { email, password, name })
      .then((response: AxiosResponse) => resolve(response))
      .catch((error: AxiosError) => reject(error));
  });
