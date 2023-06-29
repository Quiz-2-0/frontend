/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable react/no-array-index-key */
import React, { FC, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { SplitLayout, Spinner } from '@vkontakte/vkui';
import { useSelector } from '../store/store.types';
import LayoutWithColumns from '../ui-lib/widgets/LayoutWithColumns';
import MainLayout from '../ui-lib/widgets/MainLayout';
import { routes } from '../constants/routes';
import QuizCard from '../ui-lib/widgets/QuizCard';

/// потом сделаем переключение темы
const Main = styled.main`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: #FFF;
`;

const App = () => {
  const location = useLocation();
  const { isLogged } = useSelector((state) => state.all);
  return (
    <Main style={{ fontFamily: 'SFProDisplay' }}>

      <React.Suspense fallback={<SplitLayout popout={<Spinner />} />}>
        <Routes>
          <Route path='quizzes' element={<QuizCard />} />
          <Route path='/login' element={<LayoutWithColumns />} />
          <Route path='/reset-password' element={<LayoutWithColumns />} />
          {routes.map(({ path, Component }, index) => (
            <Route element={<MainLayout />} key={index}>
              <Route path={path} element={Component} />
            </Route>
          ))}
        </Routes>
      </React.Suspense>
    </Main>
  );
};

export default App;
