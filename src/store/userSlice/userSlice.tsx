/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TUser } from '../../types/types';
import { sliceName } from './selectors';

type TState = {
  currentUser: TUser | null;
};

const initialState: TState = {
  currentUser: null,

};

const userDataSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<TUser>) => ({
      ...state, currentUser: action.payload,
    }),
  },
});

const userReducer = userDataSlice.reducer;
export const {
  setCurrentUser,
} = userDataSlice.actions;

export default userReducer;
