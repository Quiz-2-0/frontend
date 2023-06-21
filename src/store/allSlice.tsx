import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
  name: 'allData',
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
    resetPassword: (state, action: PayloadAction<string>) => {

    },
  },
});

const allReducer = allSlice.reducer;
export const {
  setRememberMe,
  setMistake,
  resetPassword,
  setLogged,
} = allSlice.actions;

export default allReducer;
