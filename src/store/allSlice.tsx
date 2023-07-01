import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { mockQuizes } from '../constants/mock-data';
import { TQuiz } from '../types/types';

type TState = {
  isRememberMe: boolean;
  mistake: string;
  isLogged: boolean;
  quizzesOnPage: TQuiz[];
  isFiltered: boolean;
  filteredQuizzes: TQuiz[];
  quizType: string;
  fromCastle: boolean;
};

const initialState: TState = {
  isRememberMe: false,
  mistake: '',
  isLogged: false,
  quizzesOnPage: mockQuizes,
  isFiltered: false,
  filteredQuizzes: [],
  quizType: 'all',
  fromCastle: false,
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
    setQuizzesOnPage: (state, action: PayloadAction<TQuiz[]>) => ({
      ...state, quizzesOnPage: action.payload,
    }),
    setIsFiltered: (state, action: PayloadAction<boolean>) => ({
      ...state, isFiltered: action.payload,
    }),
    setFilteredQuizzes: (state, action: PayloadAction<TQuiz[]>) => ({
      ...state, filteredQuizzes: action.payload,
    }),
    setQuizType: (state, action: PayloadAction<string>) => ({
      ...state, quizType: action.payload,
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
  setQuizzesOnPage,
  setIsFiltered,
  setFilteredQuizzes,
  setQuizType,
  setFromCastle,
} = allSlice.actions;

export default allReducer;
