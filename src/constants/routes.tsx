/* eslint-disable react/react-in-jsx-scope */

import React from 'react';

/* eslint-disable import/prefer-default-export */
const PersonalAccount = React.lazy(() => import('../pages/PersonalAccount'));
const Quizzes = React.lazy(() => import('../pages/Quizzes'));
const Quiz = React.lazy(() => import('../pages/Quiz'));
const QuizQuestion = React.lazy(() => import('../pages/QuizQuestion'));
const QuizErrorsReview = React.lazy(() => import('../pages/QuizErrorsReview'));
const Staff = React.lazy(() => import('../pages/Staff'));
const AchievementsPage = React.lazy(() => import('../pages/AchievementsPage'));
const NewQuiz = React.lazy(() => import('../pages/NewQuiz'));
const CreateNewQuiz = React.lazy(() => import('../pages/CreateNewQuiz'));
/// сюда все урлы защищенные помещаем
export const routes = [
  { path: '/', Component: <PersonalAccount />, role: 'EMP' },
  { path: '/quizzes', Component: <Quizzes />, role: 'EMP' },
  { path: '/quizzes/:id', Component: <Quiz />, role: 'EMP' },
  { path: '/quizzes/:id/question', Component: <QuizQuestion />, role: 'EMP' },
  { path: '/quizzes/:id/review', Component: <QuizErrorsReview />, role: 'EMP' },
  { path: '/achievements', Component: <AchievementsPage />, role: 'EMP' },
  { path: '/staff', Component: <Staff />, role: 'AD' },
  { path: '/new-quiz', Component: <NewQuiz />, role: 'AD' },
  { path: '/new-quiz/:id', Component: <CreateNewQuiz />, role: 'AD' },
];
