import { configureStore } from '@reduxjs/toolkit';

import userReducer from './userSlice/userSlice';
import allReducer from './allSlice/allSlice';

import {
  adminApi,
  adminDepartmentsApi,
  adminLevelsApi,
  adminQuestionsApi,
  adminQuizzesApi,
  adminTagsApi, adminUsersApi,
  adminVolumesApi,
  quizApi,
  userApi,
} from '@/api/apiv2';

const store = configureStore({
  reducer: {
    user: userReducer,
    all: allReducer,
    [userApi.reducerPath]: userApi.reducer,
    [quizApi.reducerPath]: quizApi.reducer,
    [adminApi.reducerPath]: adminApi.reducer,
    [adminTagsApi.reducerPath]: adminTagsApi.reducer,
    [adminLevelsApi.reducerPath]: adminLevelsApi.reducer,
    [adminDepartmentsApi.reducerPath]: adminDepartmentsApi.reducer,
    [adminQuizzesApi.reducerPath]: adminQuizzesApi.reducer,
    [adminQuestionsApi.reducerPath]: adminQuestionsApi.reducer,
    [adminVolumesApi.reducerPath]: adminVolumesApi.reducer,
    [adminUsersApi.reducerPath]: adminUsersApi.reducer,
  },
  middleware:
    (getDefaultMiddleware) => getDefaultMiddleware()
      .concat(userApi.middleware)
      .concat(quizApi.middleware)
      .concat(adminApi.middleware)
      .concat(adminTagsApi.middleware)
      .concat(adminLevelsApi.middleware)
      .concat(adminDepartmentsApi.middleware)
      .concat(adminQuizzesApi.middleware)
      .concat(adminQuestionsApi.middleware)
      .concat(adminVolumesApi.middleware)
      .concat(adminUsersApi.middleware),
});

export default store;
