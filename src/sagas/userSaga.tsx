/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable import/prefer-default-export */
import {
  call, put, takeLatest, select,
} from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { fetchUserData, setCurrentUser } from '../store/userSlice';
import { setMistake, setLogged } from '../store/allSlice';
import { loginUser, jwt } from '../api/api';
import { TUser } from '../types/types';

function* loginWorker(action: PayloadAction<{ email: string, password: string }>) {
  const { email, password } = action.payload;

  try {
    /// идем на сервер
    const { data } = yield call(() => loginUser(email, password));

    const { token, ...rest } = data;

    const isRemember: boolean = yield select((state) => state.all.isRememberMe);
    jwt.set(token, isRemember);
    // в случае успеха отдать данные редьюсеру
    yield put(setCurrentUser(rest as TUser));
    yield put(setLogged(true));
  } catch (error: any) {
    yield put(setMistake(error.message));
  }
}

export function* loginWatcher() {
  yield takeLatest(fetchUserData.type, loginWorker);
}
