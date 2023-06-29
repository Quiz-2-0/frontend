/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable import/prefer-default-export */
import PersonalAccount from '../pages/PersonalAccount';
import Quizzes from '../pages/Quizzes';
/// сюда все урлы защищенные помещаем
export const routes = [
  { path: '/', Component: <PersonalAccount /> },
  { path: '/quizzes', Component: <Quizzes /> },
];
