/* eslint-disable ternary/nesting */
/* eslint-disable no-nested-ternary */
import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import {
  Routes,
  Route,
  useLocation,
  Navigate,
} from 'react-router-dom';
import styled from 'styled-components';

import MainLayout from '@/ui-lib/layouts/MainLayout';
import { routes } from '@/constants/routes';
import Error from '@/pages/Error';
import Loader from '@/ui-lib/widgets/Loader';
import { useSelector } from '@/store/store.types';
import Login from '@/pages/Login';
import ResetPassword from '@/pages/ResetPassword';

/// потом сделаем переключение темы
const Main = styled.main`
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: #FFF;
`;

const App = () => {
  const location = useLocation();
  const { isLoaderRun } = useSelector((state) => state.all);
  const localStorageRole = localStorage.getItem('role') ?? '';
  const sessionStorageRole = sessionStorage.getItem('role') ?? '';

  const userRole = (localStorageRole !== '') ? localStorageRole : sessionStorageRole;

  return (
    <DndProvider backend={HTML5Backend}>
      <Main style={{ fontFamily: 'SFProDisplay' }}>
        {isLoaderRun && <Loader />}
        <React.Suspense>
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/reset-password' element={<ResetPassword />} />
            <Route path='/404' element={<Error />} />
            {routes.map(({ path, Component, role }) => (
              (userRole === role) ? (
                <Route element={<MainLayout />} key={path}>
                  <Route path={path} element={Component} />
                </Route>
              ) : (
                userRole === ''
                  ? <Route path='*' element={<Navigate to='/login' />} />
                  : <Route path='*' element={<Navigate to={`${(userRole === 'AD' && location.pathname === '/') ? '/staff' : '/404'}`} replace />} />
              )))}
          </Routes>
        </React.Suspense>
      </Main>
    </DndProvider>
  );
};

export default App;
