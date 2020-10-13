import axios, { AxiosError, AxiosResponse } from 'axios';
import { IRequestCommentPayload, IRequestLikePayload } from '../actions';
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

export const requestLogout = () =>
  new Promise((resolve, reject) => {
    axios
      .get(endpoint + '/user/logout', { withCredentials: true })
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

export const requestGetAllVideos = () =>
  new Promise((resolve, reject) => {
    axios
      .get(endpoint + '/video/getall')
      .then((response: AxiosResponse) => resolve(response))
      .catch((error: AxiosError) => reject(error));
  });
export const requestGetOneVideo = (video_id: string) =>
  new Promise((resolve, reject) => {
    axios
      .post(endpoint + '/video/getone', { video_id })
      .then((response: AxiosResponse) => resolve(response))
      .catch((error: AxiosError) => reject(error));
  });

export const requestLikeVideo = (data: IRequestLikePayload) =>
  new Promise((resolve, reject) => {
    axios
      .post(endpoint + '/video/like', data)
      .then((response: AxiosResponse) => resolve(response))
      .catch((error: AxiosError) => reject(error));
  });

export const requestComment = (data: IRequestCommentPayload) =>
  new Promise((resolve, reject) => {
    axios
      .post(endpoint + '/video/comment', data)
      .then((response: AxiosResponse) => resolve(response))
      .catch((error: AxiosError) => reject(error));
  });
export const requestDeleteComment = (comment_id: string) =>
  new Promise((resolve, reject) => {
    axios
      .post(endpoint + '/video/deletecomment', comment_id)
      .then((response: AxiosResponse) => resolve(response))
      .catch((error: AxiosError) => reject(error));
  });
