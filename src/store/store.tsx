/* eslint-disable max-len */
import { configureStore } from '@reduxjs/toolkit';

import userReducer from './userSlice/userSlice';
import allReducer from './allSlice/allSlice';

import { userApi, quizApi, adminApi } from '@/api/apiv2';

const store = configureStore({
  reducer: {
    user: userReducer,
    all: allReducer,
    [userApi.reducerPath]: userApi.reducer,
    [quizApi.reducerPath]: quizApi.reducer,
    [adminApi.reducerPath]: adminApi.reducer,
  },
  middleware:
    (getDefaultMiddleware) => getDefaultMiddleware().concat(userApi.middleware).concat(quizApi.middleware).concat(adminApi.middleware),
});

export default store;
