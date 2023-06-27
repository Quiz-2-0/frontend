import { configureStore } from '@reduxjs/toolkit';

import userReducer from './userSlice';
import allReducer from './allSlice';

import { userApi } from '../api/apiv2';

const store = configureStore({
  reducer: {
    user: userReducer,
    all: allReducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userApi.middleware),
});

export default store;
