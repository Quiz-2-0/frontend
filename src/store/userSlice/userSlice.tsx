/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '@/types/types';
import { sliceName } from './selectors';

interface IState {
  currentUser: IUser | null;
}

const initialState: IState = {
  currentUser: null,

};

const userDataSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<IUser>) => ({
      ...state, currentUser: action.payload,
    }),
  },
});

const userReducer = userDataSlice.reducer;
export const {
  setCurrentUser,
} = userDataSlice.actions;

export default userReducer;
