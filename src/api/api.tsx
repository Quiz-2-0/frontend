/* eslint-disable ternary/no-unreachable */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import axios, { AxiosInstance, AxiosPromise, AxiosRequestConfig } from 'axios';
import { API_ROOT, LOGIN_ROUTE, RESET_PASSWORD } from '../constants/api-url';

const defaultRequestConfig: AxiosRequestConfig = {
  baseURL: API_ROOT,
  headers: {
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  },
};

export const jwt = {
  set: (value: string, isRemember: boolean): void => {
    if (value) {
      if (isRemember) {
        localStorage.setItem('JWT', `${value}`);
        return;
      }
      sessionStorage.setItem('JWT', `${value}`);
    } else {
      if (isRemember) {
        localStorage.removeItem('JWT');
      }
      sessionStorage.removeItem('JWT');
    }
  },
  get: (isRemember: boolean): string => {
    const res = isRemember ? localStorage.getItem('JWT') : sessionStorage.getItem('JWT');
    return res || '';
  },
  test: (isRemember: boolean): boolean => (isRemember ? !!localStorage.getItem('JWT') : !!sessionStorage.getItem('JWT')),
  remove: (isRemember: boolean): void => (isRemember ? localStorage.removeItem('JWT') : sessionStorage.removeItem('JWT')),
};

const injectBearerToken = (requestConfig: AxiosRequestConfig, isRemember: boolean): AxiosRequestConfig => ({ ...requestConfig, headers: { ...defaultRequestConfig.headers, Authorization: `Bearer ${jwt.get(isRemember)}` } });

const appAPI: AxiosInstance = axios.create(defaultRequestConfig);

export const loginUser = (
  email: string,
  password: string,
) => {
  const loginData = {
    email, password,
  };
  const requestConfig: AxiosRequestConfig = {
    url: LOGIN_ROUTE,
    method: 'post',
    data: loginData,
  };
  return appAPI(requestConfig);
};

export const recoverPassword = (email: string) => {
  const requestConfig: AxiosRequestConfig = {
    url: RESET_PASSWORD,
    method: 'post',
    data: { email },
  };
  return appAPI(requestConfig);
};
