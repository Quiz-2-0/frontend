import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { sliceName } from './selectors';

type TState = {
  isRememberMe: boolean;
  mistake: string;
  isLogged: boolean;
  fromCastle: boolean;
};

const initialState: TState = {
  isRememberMe: false,
  mistake: '',
  isLogged: false,
  fromCastle: false,
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
    setFromCastle: (state, action: PayloadAction<boolean>) => ({
      ...state, fromCastle: action.payload,
    }),
  },
});

const allReducer = allSlice.reducer;
export const {
  setRememberMe,
  setMistake,
  setLogged,
  setFromCastle,
} = allSlice.actions;

export default allReducer;
