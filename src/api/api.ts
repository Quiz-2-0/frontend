import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  API_ROOT,
  USER_ROUTE,
  LOGIN_ROUTE,
  RESET_PASSWORD_ROUTE,
  QUIZZES_ROUTE,
  USER_ACHIEVEMENTS_ROUTE,
  ADMIN_DEPARTMENTS_ROUTE,
  ADMIN_LEVELS_ROUTE,
  ADMIN_QUIZZES_ROUTE,
  ADMIN_USERS_ROUTE,
  ADMIN_NEW_USER_ROUTE,
  ADMIN_TAGS_ROUTE,
} from './api-url';
import {
  AdminImage,
  AdminQuiz,
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
  IAdminGetQuizRequest,
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
        url: RESET_PASSWORD_ROUTE,
        method: 'POST',
        body: { email },
      }),
    }),
    getCurrentUser: build.query<IUser, void>({
      query: () => ({
        url: USER_ROUTE,
        headers: {
          Authorization: `Bearer ${jwt.get()}`,
        },
      }),
      providesTags: ['user'],
      keepUnusedDataFor: 0,
    }),
    getAchievements: build.query<IAchievement[], void>({
      query: () => ({
        url: USER_ACHIEVEMENTS_ROUTE,
        headers: {
          Authorization: `Bearer ${jwt.get()}`,
        },
      }),
    }),
    getShortAchievements: build.query<IShortAchievement[], void>({
      query: () => ({
        url: `${USER_ACHIEVEMENTS_ROUTE}short/`,
        headers: {
          Authorization: `Bearer ${jwt.get()}`,
        },
      }),
    }),
    getShortRatings: build.query<IShortRating[], void>({
      query: () => ({
        url: '/users/ratings/short',
        headers: {
          Authorization: `Bearer ${jwt.get()}`,
        },
      }),
    }),
    getDefaultAvatars: build.query<IDefaultAvatar[], void>({
      query: () => ({
        url: '/users/avatar',
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
    getAllQuizzes: build.query<IQuiz[], void>({
      query: () => QUIZZES_ROUTE,
      keepUnusedDataFor: 0,
    }),
    getIncompleteQuizzes: build.query<IQuiz[], void>({
      query: () => `${QUIZZES_ROUTE}not_complited/`,
      keepUnusedDataFor: 0,
    }),
    getQuiz: build.query<IQuiz, number>({
      query: (id: number) => `${QUIZZES_ROUTE}${id}/`,
      providesTags: ['quiz'],
      keepUnusedDataFor: 0,
    }),
    getStatistic: build.query<Statistic, number>({
      query: (id: number) => `${QUIZZES_ROUTE}${id}/statistic/`,
      keepUnusedDataFor: 0,
    }),
    setAnswer: build.mutation<void, TAnswerRequest>({
      query: ({ quizId, ...patch }) => ({
        url: `${QUIZZES_ROUTE}${quizId}/answer/`,
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
      query: () => ADMIN_TAGS_ROUTE,
    }),
    createTag: build.mutation<Tag, IAdminTagsRequest>({
      query: (body) => ({
        url: ADMIN_TAGS_ROUTE,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['adminTag'],
    }),
    getTag: build.query<Tag, number>({
      query: (id) => `${ADMIN_TAGS_ROUTE}${id}/`,
    }),
    updateTag: build.mutation<Tag, Tag>({
      query: ({ id, ...body }) => ({
        url: `${ADMIN_TAGS_ROUTE}${id}/`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['adminTag'],
    }),
    removeTag: build.mutation<void, number>({
      query: (id) => ({
        url: `${ADMIN_TAGS_ROUTE}${id}/`,
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
      query: () => ADMIN_DEPARTMENTS_ROUTE,
    }),
    createDepartment: build.mutation<IDepartment, string>({
      query: (name) => ({
        url: ADMIN_DEPARTMENTS_ROUTE,
        method: 'POST',
        body: { name },
      }),
      invalidatesTags: ['adminDepartment'],
    }),
    getDepartment: build.query<IDepartment, number>({
      query: (id) => `${ADMIN_DEPARTMENTS_ROUTE}${id}/`,
    }),
    updateDepartment: build.mutation<IDepartment, IDepartment>({
      query: ({ id, ...body }) => ({
        url: `${ADMIN_DEPARTMENTS_ROUTE}${id}/`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['adminDepartment'],
    }),
    removeDepartment: build.mutation<void, number>({
      query: (id) => ({
        url: `${ADMIN_DEPARTMENTS_ROUTE}${id}/`,
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
    getQuizzes: build.query<AdminQuiz[], void>({
      query: () => ADMIN_QUIZZES_ROUTE,
    }),
    getImagesForQuizzes: build.query<AdminImage[], void>({
      query: () => `${ADMIN_QUIZZES_ROUTE}images/`,
    }),
    createQuiz: build.mutation<IAdminCreateQuizRequest, IAdminCreateQuizRequest>({
      query: (quiz) => ({
        url: ADMIN_QUIZZES_ROUTE,
        method: 'POST',
        body: quiz,
      }),
      invalidatesTags: ['adminQuiz'],
    }),
    assignQuizzesToUsers: build.mutation<void, IAdminAssignQuizzesToUsersRequest>({
      query: (body) => ({
        url: `${ADMIN_QUIZZES_ROUTE}assigned_list/`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['adminQuiz'],
    }),
    getAdminQuiz: build.query<IAdminGetQuizRequest, number>({
      query: (quizId) => `${ADMIN_QUIZZES_ROUTE}${quizId}/`,
      keepUnusedDataFor: 0,
    }),
    updateQuiz: build.mutation<IAdminCreateQuizRequest, IAdminUpdateQuizRequest>({
      query: ({ quizId, quiz }) => ({
        url: `${ADMIN_QUIZZES_ROUTE}${quizId}/`,
        method: 'PUT',
        body: quiz,
      }),
      invalidatesTags: ['adminQuiz'],
    }),
    removeQuiz: build.mutation<void, number>({
      query: (quizId) => ({
        url: `${ADMIN_QUIZZES_ROUTE}${quizId}/`,
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
      query: (quizId) => `${ADMIN_QUIZZES_ROUTE}${quizId}/questions/`,
    }),
    createQuestion: build.mutation<IQuestionAdmin, IAdminCreateQuestionRequest>({
      query: ({ quizId, question }) => ({
        url: `${ADMIN_QUIZZES_ROUTE}${quizId}/questions/`,
        method: 'POST',
        body: question,
      }),
      invalidatesTags: ['adminQuestion'],
    }),
    createQuestionsList: build.mutation<IQuestionAdmin[], IAdminCreateQuestionsListRequest>({
      query: ({ quizId, questions }) => ({
        url: `${ADMIN_QUIZZES_ROUTE}${quizId}/questions_list/`,
        method: 'POST',
        body: questions,
      }),
      invalidatesTags: ['adminQuestion'],
    }),
    updateQuestion: build.mutation<IQuestionAdmin, IAdminUpdateQuestionRequest>({
      query: ({ quizId, questionId, question }) => ({
        url: `${ADMIN_QUIZZES_ROUTE}${quizId}/questions/${questionId}/`,
        method: 'PATCH',
        body: question,
      }),
      invalidatesTags: ['adminQuestion'],
    }),
    removeQuestion: build.mutation<void, IAdminRemoveQuestionRequest>({
      query: ({ quizId, questionId }) => ({
        url: `${ADMIN_QUIZZES_ROUTE}${quizId}/questions/${questionId}/`,
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
      query: (quizId) => `${ADMIN_QUIZZES_ROUTE}${quizId}/volumes/`,
    }),
    createVolume: build.mutation<Volume, IAdminCreateVolumeRequest>({
      query: ({ quizId, volume }) => ({
        url: `${ADMIN_QUIZZES_ROUTE}${quizId}/volumes/`,
        method: 'POST',
        body: volume,
      }),
      invalidatesTags: ['adminVolume'],
    }),
    getVolume: build.query<Volume, IAdminGetVolumeRequest>({
      query: ({ quizId, volumeId }) => `${ADMIN_QUIZZES_ROUTE}${quizId}/volumes/${volumeId}/`,
    }),
    updateVolume: build.mutation<Volume, IAdminUpdateVolumeRequest>({
      query: ({ quizId, volumeId, volume }) => ({
        url: `${ADMIN_QUIZZES_ROUTE}${quizId}/volumes/${volumeId}/`,
        method: 'PUT',
        body: volume,
      }),
      invalidatesTags: ['adminVolume'],
    }),
    removeVolume: build.mutation<void, IAdminRemoveVolumeRequest>({
      query: ({ quizId, volumeId }) => ({
        url: `${ADMIN_QUIZZES_ROUTE}${quizId}/volumes/${volumeId}/`,
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
      query: () => ADMIN_USERS_ROUTE,
      keepUnusedDataFor: 0,
    }),
    createUser: build.mutation<IUser, IUserCreate>({
      query: (body) => ({
        url: ADMIN_NEW_USER_ROUTE,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['adminUser'],
    }),
    getUser: build.query<IUser, number>({
      query: (id) => `${ADMIN_USERS_ROUTE}${id}/`,
      keepUnusedDataFor: 0,
    }),
    updateUser: build.mutation<IUser, IAdminUpdateUserRequest>({
      query: ({ userId, user }) => ({
        url: `${ADMIN_NEW_USER_ROUTE}${userId}/`,
        method: 'PUT',
        body: user,
      }),
      invalidatesTags: ['adminUser'],
    }),
    removeUser: build.mutation<void, number>({
      query: (id) => ({
        url: `${ADMIN_NEW_USER_ROUTE}${id}/`,
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
  useGetAllQuizzesQuery,
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
  useGetImagesForQuizzesQuery,
  useCreateQuizMutation,
  useAssignQuizzesToUsersMutation,
  useGetAdminQuizQuery,
  useUpdateQuizMutation,
  useRemoveQuizMutation,
} = adminQuizzesApi;

export const {
  useGetQuestionsQuery,
  useCreateQuestionMutation,
  useCreateQuestionsListMutation,
  useUpdateQuestionMutation,
  useRemoveQuestionMutation,
} = adminQuestionsApi;

export const {
  useGetVolumesQuery,
  useCreateVolumeMutation,
  useGetVolumeQuery,
  useUpdateVolumeMutation,
  useRemoveVolumeMutation,
} = adminVolumesApi;

export const {
  useGetUsersQuery,
  useCreateUserMutation,
  useGetUserQuery,
  useUpdateUserMutation,
  useRemoveUserMutation,
} = adminUsersApi;
