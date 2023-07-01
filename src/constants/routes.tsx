/* eslint-disable react/react-in-jsx-scope */

import React from 'react';

/* eslint-disable import/prefer-default-export */
const PersonalAccount = React.lazy(() => import('../pages/PersonalAccount'));
const Quizzes = React.lazy(() => import('../pages/Quizzes'));
/// сюда все урлы защищенные помещаем
export const routes = [
  { path: '/', Component: <PersonalAccount /> },
  { path: '/quizzes', Component: <Quizzes /> },
];
