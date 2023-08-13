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
  IUser,
  IUserLoginRequest,
  IQuiz,
  IAchievement,
  IShortAchievement,
  IShortRating,
  IDefaultAvatar,
  TAnswerRequest,
  Statistic,
  AdminQuizz, IAvatar,
} from '@/types/types';

export const jwt = {
  set: (value: string, isRemember: boolean, role: string): void => {
    console.debug('JWT', isRemember, role);
    if (value) {
      if (isRemember) {
        localStorage.setItem('JWT', `${value}`);
        localStorage.setItem('role', `${role}`);
      } else {
        sessionStorage.setItem('JWT', `${value}`);
        sessionStorage.setItem('role', `${role}`);
      }
    } else {
      /* eslint-disable-next-line no-lonely-if */
      if (isRemember) {
        localStorage.removeItem('JWT');
        localStorage.removeItem('role');
      } else {
        sessionStorage.removeItem('JWT');
        sessionStorage.removeItem('role');
      }
    }
  },
  get: (): string => (
    localStorage.getItem('JWT') ?? sessionStorage.getItem('JWT') ?? ''
  ),
  test: (isRemember: boolean): boolean => (
    isRemember ? !!localStorage.getItem('JWT') : !!sessionStorage.getItem('JWT')
  ),
  remove: (isRemember: boolean): void => {
    if (isRemember) {
      localStorage.clear();
    } else {
      sessionStorage.clear();
    }
  },
};

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
    recoverPassword: build.mutation<string, string>({
      query: (email) => ({
        url: RESET_PASSWORD,
        method: 'POST',
        body: { email },
      }),
    }),
    getCurrentUser: build.query<IUser, void>({
      query: () => ({
        url: GET_USER,
        headers: {
          Authorization: `Bearer ${jwt.get()}`,
        },
      }),
      providesTags: ['user'],
      keepUnusedDataFor: 0,
    }),
    getAchievements: build.query<IAchievement[], void>({
      query: () => ({
        url: '/users/achivements/',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${jwt.get()}`,
        },
      }),
    }),
    getShortAchievements: build.query<IShortAchievement[], void>({
      query: () => ({
        url: '/users/achivements/short',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${jwt.get()}`,
        },
      }),
    }),
    getShortRatings: build.query<IShortRating[], void>({
      query: () => ({
        url: '/users/ratings/short',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${jwt.get()}`,
        },
      }),
    }),
    getDefaultAvatars: build.query<IDefaultAvatar[], void>({
      query: () => ({
        url: '/users/avatar',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${jwt.get()}`,
        },
      }),
    }),
    uploadAvatar: build.mutation<IAvatar, string>({
      query: (avatar) => ({
        url: '/users/avatar/',
        method: 'POST',
        headers: {
          Authorization: `Bearer ${jwt.get()}`,
        },
        body: { avatar },
      }),
      invalidatesTags: ['user'],
    }),
  }),
});

export const quizApi = createApi({
  reducerPath: 'quizApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_ROOT,
    prepareHeaders: (headers) => {
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
    getQuiz: build.query<IQuiz, number>({
      query: (id: number) => `${ALL_QUIZES}${id}/`,
      providesTags: ['quiz'],
      keepUnusedDataFor: 0,
    }),
    getStatistic: build.query<Statistic[], number>({
      query: (id: number) => `${ALL_QUIZES}${id}/statistic/`,
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
    prepareHeaders: (headers) => {
      headers.set('Authorization', `Bearer ${jwt.get()}`);
      return headers;
    },
  }),
  endpoints: (build) => ({
    getUsers: build.query<IUser[], void>({
      query: () => ({
        url: GET_ADMIN_USERS,
      }),
      keepUnusedDataFor: 0,
    }),
    getDepartments: build.query<{ id: number; name: string; }[], void>({
      query: () => ({
        url: GET_ADMIN_DEPARTMENTS,
      }),
      keepUnusedDataFor: 0,
    }),
    getQuizzes: build.query<AdminQuizz[], void>({
      query: () => ({
        url: GET_ADMIN_QUIZZES,
      }),
      keepUnusedDataFor: 0,
    }),

  }),
});

export const {
  useLoginMutation,
  useRecoverPasswordMutation,
  useGetCurrentUserQuery,
  useGetAchievementsQuery,
  useGetShortAchievementsQuery,
  useGetShortRatingsQuery,
  useGetDefaultAvatarsQuery,
  useUploadAvatarMutation,
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
