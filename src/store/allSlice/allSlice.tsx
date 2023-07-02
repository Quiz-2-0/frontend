import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TQuiz } from '../../types/types';
import { sliceName } from './selectors';

type TState = {
  isRememberMe: boolean;
  mistake: string;
  isLogged: boolean;
};

const initialState: TState = {
  isRememberMe: false,
  mistake: '',
  isLogged: false,
};

const allSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    setRememberMe: (state, action: PayloadAction<boolean>) => ({
      ...state, isRememberMe: action.payload,
    }),
    setMistake: (state, action: PayloadAction<string>) => ({
      ...state, mistake: action.payload,
    }),
    setLogged: (state, action: PayloadAction<boolean>) => ({
      ...state, isLogged: action.payload,
    }),
  },
});

const allReducer = allSlice.reducer;
export const {
  setRememberMe,
  setMistake,
  setLogged,
} = allSlice.actions;

export default allReducer;
