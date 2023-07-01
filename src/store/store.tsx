/* eslint-disable max-len */
import { configureStore } from '@reduxjs/toolkit';

import userReducer from './userSlice';
import allReducer from './allSlice';

import { userApi, quizApi } from '../api/apiv2';

const store = configureStore({
  reducer: {
    user: userReducer,
    all: allReducer,
    [userApi.reducerPath]: userApi.reducer,
    [quizApi.reducerPath]: quizApi.reducer,
  },
  middleware:
    (getDefaultMiddleware) => getDefaultMiddleware().concat(userApi.middleware).concat(quizApi.middleware),
});

export default store;
