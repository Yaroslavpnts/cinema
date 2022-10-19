import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { getCookie } from '../app/helpers/helperFunctions';
import { API_URL } from '../config';

const instance = axios.create({
  baseURL: API_URL,
});

instance.interceptors.request.use(
  (config: AxiosRequestConfig): AxiosRequestConfig => {
    if (config.headers) {
      config.headers['Authorization'] = `Bearer ${getCookie('token')}`;
    }

    return config;
  },
  error => {
    console.log(error);
  }
);

export { instance };
