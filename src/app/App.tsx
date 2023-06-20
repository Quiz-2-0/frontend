import React, { FC, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Login from '../pages/Login';

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
      <Login />
    </Main>
  );
};

export default App;
