/* eslint-disable react/react-in-jsx-scope */

import React from 'react';

/* eslint-disable import/prefer-default-export */
const PersonalAccount = React.lazy(() => import('../pages/PersonalAccount'));
const Quizzes = React.lazy(() => import('../pages/Quizzes'));
const Quiz = React.lazy(() => import('../pages/Quiz'));
/// сюда все урлы защищенные помещаем
export const routes = [
  { path: '/', Component: <PersonalAccount /> },
  { path: '/quizzes', Component: <Quizzes /> },
  { path: '/quizzes/:id', Component: <Quiz /> },
];
