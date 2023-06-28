import React, { FC, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { SplitLayout, Spinner } from '@vkontakte/vkui';
import { useSelector } from '../store/store.types';
import Header from '../ui-lib/Header';
import LayoutWithColumns from '../ui-lib/LayoutWithColumns';
import PersonalAccount from '../ui-lib/PersonalAccount';

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
  const { isLogged } = useSelector((state) => state.all);
  return (
    <Main style={{ fontFamily: 'SFProDisplay' }}>
      {isLogged && <Header />}

      <React.Suspense fallback={<SplitLayout popout={<Spinner />} />}>
        <Routes>
          <Route path='/' element={<PersonalAccount />} />
          <Route path='/login' element={<LayoutWithColumns />} />
          <Route path='/reset-password' element={<LayoutWithColumns />} />
        </Routes>
      </React.Suspense>
    </Main>
  );
};

export default App;
