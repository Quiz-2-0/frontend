/* eslint-disable camelcase */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable ternary/no-unreachable */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  API_ROOT, LOGIN_ROUTE, RESET_PASSWORD, ALL_QUIZES, QUIZES_STATA, GET_USER,
} from '../constants/api-url';
import {
  TUser, TUserLoginRequest, TQuize, TAnswerRequest,
} from '../types/types';

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
  get: (): string => {
    const res = localStorage.getItem('JWT') || sessionStorage.getItem('JWT');
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
    getCurrentUser: build.query<TUser, void>({
      query: () => ({
        url: GET_USER,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${jwt.get()}`,
        },

      }),
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
    }),
    getQuiz: build.query<TQuize, any>({
      query: (id: any) => `${ALL_QUIZES}${id}`,
      providesTags: ['quiz'],

    }),
    getStatistic: build.query<{ question: string, answer: string, isRight: boolean, explanation: string, right_answer: string, user_answer: string }[], any>({
      query: (id: any) => `${ALL_QUIZES}${id}/statistic`,
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
