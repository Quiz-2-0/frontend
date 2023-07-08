/* eslint-disable react/react-in-jsx-scope */

import React from 'react';

/* eslint-disable import/prefer-default-export */
const PersonalAccount = React.lazy(() => import('../pages/PersonalAccount'));
const Quizzes = React.lazy(() => import('../pages/Quizzes'));
const Quiz = React.lazy(() => import('../pages/Quiz'));
const QuizQuestion = React.lazy(() => import('../pages/QuizQuestion'));
const QuizErrorsReview = React.lazy(() => import('../pages/QuizErrorsReview'));
/// сюда все урлы защищенные помещаем
export const routes = [
  { path: '/', Component: <PersonalAccount /> },
  { path: '/quizzes', Component: <Quizzes /> },
  { path: '/quizzes/:id', Component: <Quiz /> },
  { path: '/quizzes/:id/question', Component: <QuizQuestion /> },
  { path: '/quizzes/:id/review', Component: <QuizErrorsReview /> },
];
