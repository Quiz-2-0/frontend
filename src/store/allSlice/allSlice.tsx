import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { sliceName } from './selectors';

type TState = {
  isRememberMe: boolean;
  mistake: string;
  isLogged: boolean;
  quizId: number;
};

const initialState: TState = {
  isRememberMe: false,
  mistake: '',
  isLogged: false,
  quizId: -1,
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
    setQuizId: (state, action: PayloadAction<number>) => ({
      ...state, quizId: action.payload,
    }),
  },
});

const allReducer = allSlice.reducer;
export const {
  setRememberMe,
  setMistake,
  setLogged,
  setQuizId,
} = allSlice.actions;

export default allReducer;
