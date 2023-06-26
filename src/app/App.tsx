import React, { FC, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { SplitLayout, Spinner } from '@vkontakte/vkui';
import LayoutWithColumns from '../pages/LayoutWithColumns';

/// потом сделаем переключение темы
const Main = styled.main`
  height: 100%;
  width: 100%;
  font-family: '';
  display: flex;
  flex-direction: column;
`;

const App = () => {
  const location = useLocation();
  return (
    <Main style={{ fontFamily: 'SFProDisplay' }}>

      <React.Suspense fallback={<SplitLayout popout={<Spinner />} />}>
        <Routes>
          <Route path='/login' element={<LayoutWithColumns />} />
          <Route path='/reset-password' element={<LayoutWithColumns />} />
        </Routes>
      </React.Suspense>
    </Main>
  );
};

export default App;
