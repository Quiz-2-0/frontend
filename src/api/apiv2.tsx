/* eslint-disable ternary/no-unreachable */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_ROOT, LOGIN_ROUTE, RESET_PASSWORD } from '../constants/api-url';
import { TUser, TUserLoginRequest } from '../types/types';

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
/// вот так выглядит слайс под апи на каждую сущность
export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_ROOT }),
  tagTypes: ['user'],
  endpoints: (build) => ({
    login: build.mutation<TUser, TUserLoginRequest>({
      query: (body) => ({
        url: LOGIN_ROUTE,
        method: 'POST',
        body,
      }),
    }),
    recoverPassword: build.mutation<string, string | number>({
      query: (email) => ({
        url: RESET_PASSWORD,
        method: 'POST',
        body: { email },
      }),

    }),

  }),
});

export const {
  useLoginMutation,
  useRecoverPasswordMutation,
} = userApi;
