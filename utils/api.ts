import axios, { AxiosInstance } from "axios";
import { getCookie, isAuth } from "./auth";
import Router from 'next/router';
import message from 'antd/lib/message';

declare module "axios" {
  export interface AxiosRequestConfig {
    errorHandle?: boolean;
  }
}

const API: AxiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API}`
});

const APIWithoutAuth: AxiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API}`
});

// add token to header if currentUser is logged-in
API.interceptors.request.use(async (config) => {
  if (isAuth()) {
    const token = getCookie("authorization");
    config.headers = { Authorization: token };
    return config;
  } else {
    // no way to get token
    return config;
  }
});

const errorResponseHandler = (error:any) => {
    // check for errorHandle config
    if (error.config.hasOwnProperty('errorHandle') && error.config.errorHandle === false) {
      return Promise.reject(error);
    }
  
    if (error.response) {
      const status = error.response.status;
      if (status === 403) {
        return Router.push('/403');
      } else if (status === 404) {
        return Router.push('/404');
      } else if (status === 500) {
        return Router.push('/500');
      } else if (status === 400) {
        return Router.push('/400');
      } else if (status === 401) 
        return Router.push('/401');
      } else {
        message.error(error.response.data.message);
        return Promise.reject(error);
      }
  };

  API.interceptors.response.use((response) => response, errorResponseHandler);

export {API, APIWithoutAuth};
