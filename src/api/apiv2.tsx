/* eslint-disable camelcase */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable ternary/no-unreachable */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  API_ROOT, LOGIN_ROUTE, RESET_PASSWORD, ALL_QUIZES, GET_USER,
} from '../constants/api-url';
import {
  TUser, TUserLoginRequest, TQuize, TAnswerRequest, Statistic,
} from '../types/types';

export const jwt = {
  set: (value: string, isRemember: boolean, role: string): void => {
    console.log(isRemember, role);
    if (value) {
      if (isRemember) {
        localStorage.setItem('JWT', `${value}`);
        localStorage.setItem('role', `${role}`);
        console.log(localStorage.getItem('role'), 1);
        return;
      }
      sessionStorage.setItem('JWT', `${value}`);
      sessionStorage.setItem('role', `${role}`);
      console.log(sessionStorage.getItem('role'), 2);
    } else {
      if (isRemember) {
        localStorage.removeItem('JWT');
        localStorage.removeItem('role');
        console.log(localStorage.getItem('role'), 1);
      }
      sessionStorage.removeItem('JWT');
      sessionStorage.removeItem('role');
      console.log(sessionStorage.getItem('role'), 4);
    }
  },
  get: (): string => {
    const res = localStorage.getItem('JWT') || sessionStorage.getItem('JWT');
    return res || '';
  },
  test: (isRemember: boolean): boolean => (isRemember ? !!localStorage.getItem('JWT') : !!sessionStorage.getItem('JWT')),
  remove: (isRemember: boolean): void => (isRemember ? localStorage.clear() : sessionStorage.clear()),
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
    getCurrentUser: build.query<TUser, void>({
      query: () => ({
        url: GET_USER,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${jwt.get()}`,
        },
      }),
      keepUnusedDataFor: 0,
    }),

  }),
});

export const quizApi = createApi({
  reducerPath: 'quizApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_ROOT,
    prepareHeaders: (headers, { getState, endpoint }) => {
      headers.set('Authorization', `Bearer ${jwt.get()}`);

      return headers;
    },
  }),
  tagTypes: ['quiz'],
  endpoints: (build) => ({
    getAllQuizes: build.query<TQuize[], void>({
      query: () => ALL_QUIZES,
      keepUnusedDataFor: 0,
    }),
    getQuiz: build.query<TQuize, any>({
      query: (id: any) => `${ALL_QUIZES}${id}`,
      providesTags: ['quiz'],
      keepUnusedDataFor: 0,
    }),
    getStatistic: build.query<Statistic[], any>({
      query: (id: any) => `${ALL_QUIZES}${id}/statistic`,
      keepUnusedDataFor: 0,
    }),
    setAnswer: build.mutation<void, TAnswerRequest>({
      query: ({ quizId, ...patch }) => ({
        url: `${ALL_QUIZES}${quizId}/answer/`,
        method: 'POST',
        body: patch,
      }),
      invalidatesTags: ['quiz'],
    }),
  }),
});

export const {
  useLoginMutation,
  useRecoverPasswordMutation,
  useGetCurrentUserQuery,
} = userApi;

export const {
  useGetAllQuizesQuery,
  useGetQuizQuery,
  useSetAnswerMutation,
  useGetStatisticQuery,
} = quizApi;
