/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable import/prefer-default-export */
import {
  call, put, takeLatest,
} from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { recoverPassword } from '../api/api';
import { resetPassword, setMistake } from '../store/allSlice';

function* resetWorker(action: PayloadAction<string>) {
  const email = action.payload;
  console.log(email);
  try {
    /// идем на сервер
    yield call(() => recoverPassword(email));
  } catch (error: any) {
    yield put(setMistake(error.message));
  }
}

export function* resetWatcher() {
  yield takeLatest(resetPassword.type, resetWorker);
}
