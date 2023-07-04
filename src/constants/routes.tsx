/* eslint-disable react/react-in-jsx-scope */

import React, { ComponentType } from 'react';

/* eslint-disable import/prefer-default-export */
const PersonalAccount = React.lazy(() => import('../pages/PersonalAccount'));
const Quizzes = React.lazy(() => import('../pages/Quizzes'));
const Quiz = React.lazy(() => import('../pages/Quiz'));
const QuizQuestion = React.lazy(() => import('../pages/QuizQuestion'));
/// сюда все урлы защищенные помещаем

interface routes {
  path: string,
  Component: ComponentType,
}

export const routes = [
  { path: '/', Component: <PersonalAccount /> },
  { path: '/quizzes', Component: <Quizzes /> },
  { path: '/quizzes/quiz', Component: <Quiz /> },
  { path: '/quizzes/quiz/question', Component: <QuizQuestion /> },
];
