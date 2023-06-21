import React, { FC, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { SplitLayout, Spinner } from '@vkontakte/vkui';

const Login = React.lazy(() => import('../pages/Login'));
const ResetPassword = React.lazy(() => import('../pages/ResetPassword'));

/// потом сделаем переключение темы
const Main = styled.main`
  height: 100%;
  width: 100%;
  font-family: 'SFProDisplay';
  display: flex;
  flex-direction: column;
`;

const App = () => {
  const location = useLocation();
  return (
    <Main style={{ fontFamily: 'SFProDisplay' }}>

      <React.Suspense fallback={<SplitLayout popout={<Spinner />} />}>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/reset-password' element={<ResetPassword />} />
        </Routes>
      </React.Suspense>
    </Main>
  );
};

export default App;
