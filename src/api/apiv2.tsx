/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable ternary/no-unreachable */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  API_ROOT,
  LOGIN_ROUTE,
  RESET_PASSWORD,
  ALL_QUIZES,
  GET_USER,
  GET_ADMIN_QUIZZES,
  GET_ADMIN_USERS,
  GET_ADMIN_DEPARTMENTS,
} from '@/constants/api-url';
import {
  IUser, IUserLoginRequest, IQuiz, TAnswerRequest, Statistic, AdminQuizz,
} from '@/types/types';

export const jwt = {
  set: (value: string, isRemember: boolean, role: string): void => {
    if (value) {
      if (isRemember) {
        localStorage.setItem('JWT', `${value}`);
        localStorage.setItem('role', `${role}`);
        return;
      }
      sessionStorage.setItem('JWT', `${value}`);
      sessionStorage.setItem('role', `${role}`);
    } else {
      if (isRemember) {
        localStorage.removeItem('JWT');
        localStorage.removeItem('role');
      }
      sessionStorage.removeItem('JWT');
      sessionStorage.removeItem('role');
    }
  },
  get: (): string => {
    const res = localStorage.getItem('JWT') ?? sessionStorage.getItem('JWT');
    return res || '';
  },
  test: (isRemember: boolean): boolean => (isRemember ? !!localStorage.getItem('JWT') : !!sessionStorage.getItem('JWT')),
  remove: (isRemember: boolean): void => (
    isRemember ? localStorage.clear() : sessionStorage.clear()
  ),
};
/// вот так выглядит слайс под апи на каждую сущность
export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_ROOT }),
  tagTypes: ['user'],
  endpoints: (build) => ({
    login: build.mutation<IUser, IUserLoginRequest>({
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
    getCurrentUser: build.query<IUser, void>({
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
    getAllQuizes: build.query<IQuiz[], void>({
      query: () => ALL_QUIZES,
      keepUnusedDataFor: 0,
    }),
    getQuiz: build.query<IQuiz, any>({
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

export const adminApi = createApi({
  reducerPath: 'adminApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_ROOT,
  }),
  endpoints: (build) => ({
    getUsers: build.query<IUser[], void>({
      query: () => ({
        url: GET_ADMIN_USERS,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${jwt.get()}`,
        },
      }),
      keepUnusedDataFor: 0,
    }),
    getDepartments: build.query<{ id: number; name: string; }[], void>({
      query: () => ({
        url: GET_ADMIN_DEPARTMENTS,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${jwt.get()}`,
        },
      }),
      keepUnusedDataFor: 0,
    }),
    getQuizzes: build.query<AdminQuizz[], void>({
      query: () => ({
        url: GET_ADMIN_QUIZZES,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${jwt.get()}`,
        },
      }),
      keepUnusedDataFor: 0,
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

export const {
  useGetDepartmentsQuery,
  useGetUsersQuery,
  useGetQuizzesQuery,
} = adminApi;
