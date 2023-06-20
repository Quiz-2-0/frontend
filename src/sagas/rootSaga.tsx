import { all } from 'redux-saga/effects';
import { loginWatcher } from './userSaga';
import { resetWatcher } from './reset-password-saga';

export default function* rootSaga() {
  yield all([
    loginWatcher(),
    resetWatcher(),
  ]);
}
