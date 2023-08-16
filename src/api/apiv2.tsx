/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  ADMIN_LEVELS_ROUTE,
  ALL_QUIZES,
  API_ROOT,
  GET_ADMIN_QUIZZES,
  GET_ADMIN_USERS,
  GET_USER,
  LOGIN_ROUTE,
  POST_ADMIN_NEW_USER,
  RESET_PASSWORD,
} from '@/constants/api-url';
import {
  AdminQuizz,
  IAchievement,
  IAvatar,
  IDefaultAvatar,
  IDepartment,
  ILevel,
  IQuestionAdmin,
  IQuiz,
  IShortAchievement,
  IShortRating,
  IUser,
  IUserCreate,
  LevelCreate,
  Statistic,
  Tag,
  Volume,
} from '@/types/types';
import {
  IAdminAssignQuizzesToUsersRequest,
  IAdminCreateQuestionRequest,
  IAdminCreateQuestionsListRequest,
  IAdminCreateQuizRequest,
  IAdminCreateVolumeRequest,
  IAdminGetVolumeRequest,
  IAdminRemoveQuestionRequest,
  IAdminRemoveVolumeRequest,
  IAdminTagsRequest,
  IAdminUpdateLevelsRequest,
  IAdminUpdateQuestionRequest,
  IAdminUpdateQuizRequest,
  IAdminUpdateUserRequest,
  IAdminUpdateVolumeRequest,
  IUserLoginRequest,
  TAnswerRequest,
} from './types';

export const jwt = {
  set: (value: string, isRemember: boolean, role: string): void => {
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
    getIncompleteQuizzes: build.query<IQuiz[], void>({
      query: () => '/quizes/not_complited/',
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

export const adminTagsApi = createApi({
  reducerPath: 'adminTagsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_ROOT,
    prepareHeaders: (headers) => {
      headers.set('Authorization', `Bearer ${jwt.get()}`);
      return headers;
    },
  }),
  tagTypes: ['adminTag'],
  endpoints: (build) => ({
    getTags: build.query<Tag[], void>({
      query: () => '/admin/tags/',
    }),
    createTag: build.mutation<Tag, IAdminTagsRequest>({
      query: (body) => ({
        url: '/admin/tags/',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['adminTag'],
    }),
    getTag: build.query<Tag, number>({
      query: (id) => `/admin/tags/${id}`,
    }),
    updateTag: build.mutation<Tag, Tag>({
      query: ({ id, ...body }) => ({
        url: `/admin/tags/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['adminTag'],
    }),
    removeTag: build.mutation<void, number>({
      query: (id) => ({
        url: `/admin/tags/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['adminTag'],
    }),
  }),
});

export const adminLevelsApi = createApi({
  reducerPath: 'adminLevelsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_ROOT,
    prepareHeaders: (headers) => {
      headers.set('Authorization', `Bearer ${jwt.get()}`);
      return headers;
    },
  }),
  tagTypes: ['adminLevel'],
  endpoints: (build) => ({
    getLevels: build.query<ILevel[], void>({
      query: () => ADMIN_LEVELS_ROUTE,
    }),
    createLevel: build.mutation<ILevel, LevelCreate>({
      query: (level) => ({
        url: ADMIN_LEVELS_ROUTE,
        method: 'POST',
        body: level,
      }),
      invalidatesTags: ['adminLevel'],
    }),
    getLevel: build.query<ILevel, number>({
      query: (levelId) => `${ADMIN_LEVELS_ROUTE}${levelId}/`,
    }),
    updateLevel: build.mutation<ILevel, IAdminUpdateLevelsRequest>({
      query: ({ levelId, level }) => ({
        url: `${ADMIN_LEVELS_ROUTE}${levelId}/`,
        method: 'PUT',
        body: level,
      }),
      invalidatesTags: ['adminLevel'],
    }),
    removeLevel: build.mutation<void, number>({
      query: (id) => ({
        url: `${ADMIN_LEVELS_ROUTE}${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['adminLevel'],
    }),
  }),
});

export const adminDepartmentsApi = createApi({
  reducerPath: 'adminDepartmentsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_ROOT,
    prepareHeaders: (headers) => {
      headers.set('Authorization', `Bearer ${jwt.get()}`);
      return headers;
    },
  }),
  tagTypes: ['adminDepartment'],
  endpoints: (build) => ({
    getDepartments: build.query<IDepartment[], void>({
      query: () => '/admin/users/departments/',
    }),
    createDepartment: build.mutation<IDepartment, string>({
      query: (name) => ({
        url: '/admin/users/departments/',
        method: 'POST',
        body: { name },
      }),
      invalidatesTags: ['adminDepartment'],
    }),
    getDepartment: build.query<IDepartment, number>({
      query: (id) => `/admin/users/departments/${id}`,
    }),
    updateDepartment: build.mutation<IDepartment, IDepartment>({
      query: ({ id, ...body }) => ({
        url: `/admin/users/departments/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['adminDepartment'],
    }),
    removeDepartment: build.mutation<void, number>({
      query: (id) => ({
        url: `/admin/users/departments/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['adminDepartment'],
    }),
  }),
});

export const adminQuizzesApi = createApi({
  reducerPath: 'adminQuizzesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_ROOT,
    prepareHeaders: (headers) => {
      headers.set('Authorization', `Bearer ${jwt.get()}`);
      return headers;
    },
  }),
  tagTypes: ['adminQuiz'],
  endpoints: (build) => ({
    getQuizzes: build.query<AdminQuizz[], void>({
      query: () => GET_ADMIN_QUIZZES,
    }),
    createQuiz: build.mutation<AdminQuizz, IAdminCreateQuizRequest>({
      query: (quiz) => ({
        url: GET_ADMIN_QUIZZES,
        method: 'POST',
        body: quiz,
      }),
      invalidatesTags: ['adminQuiz'],
    }),
    assignQuizzesToUsers: build.mutation<void, IAdminAssignQuizzesToUsersRequest>({
      query: (body) => ({
        url: `${GET_ADMIN_QUIZZES}assigned_list/`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['adminQuiz'],
    }),
    getQuiz: build.query<AdminQuizz, number>({
      query: (quizId) => `${GET_ADMIN_QUIZZES}${quizId}/`,
    }),
    updateQuiz: build.mutation<AdminQuizz, IAdminUpdateQuizRequest>({
      query: ({ quizId, quiz }) => ({
        url: `${GET_ADMIN_QUIZZES}${quizId}/`,
        method: 'PUT',
        body: quiz,
      }),
      invalidatesTags: ['adminQuiz'],
    }),
    deleteQuiz: build.mutation<void, number>({
      query: (quizId) => ({
        url: `${GET_ADMIN_QUIZZES}${quizId}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['adminQuiz'],
    }),
  }),
});

export const adminQuestionsApi = createApi({
  reducerPath: 'adminQuestionsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_ROOT,
    prepareHeaders: (headers) => {
      headers.set('Authorization', `Bearer ${jwt.get()}`);
      return headers;
    },
  }),
  tagTypes: ['adminQuestion'],
  endpoints: (build) => ({
    getQuestions: build.query<IQuestionAdmin[], number>({
      query: (quizId) => `${GET_ADMIN_QUIZZES}${quizId}/questions/`,
    }),
    createQuestion: build.mutation<IQuestionAdmin, IAdminCreateQuestionRequest>({
      query: ({ quizId, question }) => ({
        url: `${GET_ADMIN_QUIZZES}${quizId}/questions/`,
        method: 'POST',
        body: question,
      }),
      invalidatesTags: ['adminQuestion'],
    }),
    createQuestionsList: build.mutation<IQuestionAdmin[], IAdminCreateQuestionsListRequest>({
      query: ({ quizId, questions }) => ({
        url: `${GET_ADMIN_QUIZZES}${quizId}/questions_list/`,
        method: 'POST',
        body: questions,
      }),
      invalidatesTags: ['adminQuestion'],
    }),
    updateQuestion: build.mutation<IQuestionAdmin, IAdminUpdateQuestionRequest>({
      query: ({ quizId, questionId, question }) => ({
        url: `${GET_ADMIN_QUIZZES}${quizId}/questions/${questionId}/`,
        method: 'PUT',
        body: question,
      }),
      invalidatesTags: ['adminQuestion'],
    }),
    deleteQuestion: build.mutation<void, IAdminRemoveQuestionRequest>({
      query: ({ quizId, questionId }) => ({
        url: `${GET_ADMIN_QUIZZES}${quizId}/questions/${questionId}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['adminQuestion'],
    }),
  }),
});

export const adminVolumesApi = createApi({
  reducerPath: 'adminVolumesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_ROOT,
    prepareHeaders: (headers) => {
      headers.set('Authorization', `Bearer ${jwt.get()}`);
      return headers;
    },
  }),
  tagTypes: ['adminVolume'],
  endpoints: (build) => ({
    getVolumes: build.query<Volume[], number>({
      query: (quizId) => `${GET_ADMIN_QUIZZES}${quizId}/volumes/`,
    }),
    createVolume: build.mutation<Volume, IAdminCreateVolumeRequest>({
      query: ({ quizId, volume }) => ({
        url: `${GET_ADMIN_QUIZZES}${quizId}/volumes/`,
        method: 'POST',
        body: volume,
      }),
      invalidatesTags: ['adminVolume'],
    }),
    getVolume: build.query<Volume, IAdminGetVolumeRequest>({
      query: ({ quizId, volumeId }) => `${GET_ADMIN_QUIZZES}${quizId}/volumes/${volumeId}/`,
    }),
    updateVolume: build.mutation<Volume, IAdminUpdateVolumeRequest>({
      query: ({ quizId, volumeId, volume }) => ({
        url: `${GET_ADMIN_QUIZZES}${quizId}/volumes/${volumeId}/`,
        method: 'PUT',
        body: volume,
      }),
      invalidatesTags: ['adminVolume'],
    }),
    deleteVolume: build.mutation<void, IAdminRemoveVolumeRequest>({
      query: ({ quizId, volumeId }) => ({
        url: `${GET_ADMIN_QUIZZES}${quizId}/volumes/${volumeId}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['adminVolume'],
    }),
  }),
});

export const adminUsersApi = createApi({
  reducerPath: 'adminUsersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_ROOT,
    prepareHeaders: (headers) => {
      headers.set('Authorization', `Bearer ${jwt.get()}`);
      return headers;
    },
  }),
  tagTypes: ['adminUser'],
  endpoints: (build) => ({
    getUsers: build.query<IUser[], void>({
      query: () => GET_ADMIN_USERS,
      keepUnusedDataFor: 0,
    }),
    createUser: build.mutation<IUser, IUserCreate>({
      query: (body) => ({
        url: POST_ADMIN_NEW_USER,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['adminUser'],
    }),
    getUser: build.query<IUser, number>({
      query: (id) => `${GET_ADMIN_USERS}${id}/`,
    }),
    updateUser: build.mutation<IUser, IAdminUpdateUserRequest>({
      query: ({ userId, user }) => ({
        url: `${POST_ADMIN_NEW_USER}${userId}/`,
        method: 'PUT',
        body: user,
      }),
      invalidatesTags: ['adminUser'],
    }),
    removeUser: build.mutation<void, number>({
      query: (id) => ({
        url: `${POST_ADMIN_NEW_USER}${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['adminUser'],
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
  useGetIncompleteQuizzesQuery,
  useGetQuizQuery,
  useSetAnswerMutation,
  useGetStatisticQuery,
} = quizApi;

export const {
  useGetTagsQuery,
  useCreateTagMutation,
  useGetTagQuery,
  useUpdateTagMutation,
  useRemoveTagMutation,
} = adminTagsApi;

export const {
  useGetLevelsQuery,
  useCreateLevelMutation,
  useGetLevelQuery,
  useUpdateLevelMutation,
  useRemoveLevelMutation,
} = adminLevelsApi;

export const {
  useGetDepartmentsQuery,
  useCreateDepartmentMutation,
  useGetDepartmentQuery,
  useUpdateDepartmentMutation,
  useRemoveDepartmentMutation,
} = adminDepartmentsApi;

export const {
  useGetQuizzesQuery,
  useCreateQuizMutation,
  useAssignQuizzesToUsersMutation,
  // useGetQuizQuery,
  useUpdateQuizMutation,
  useDeleteQuizMutation,
} = adminQuizzesApi;

export const {
  useGetQuestionsQuery,
  useCreateQuestionMutation,
  useCreateQuestionsListMutation,
  useUpdateQuestionMutation,
  useDeleteQuestionMutation,
} = adminQuestionsApi;

export const {
  useGetVolumesQuery,
  useCreateVolumeMutation,
  useGetVolumeQuery,
  useUpdateVolumeMutation,
  useDeleteVolumeMutation,
} = adminVolumesApi;

export const {
  useGetUsersQuery,
  useCreateUserMutation,
  useGetUserQuery,
  useUpdateUserMutation,
  useRemoveUserMutation,
} = adminUsersApi;
