/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC } from 'react';
import styled from 'styled-components';
import { Navigate, Outlet, useNavigate } from 'react-router';
import Header from './Header';
import Sidebar from './Sidebar';
import { useSelector, useDispatch } from '../../store/store.types';
import { useGetCurrentUserQuery } from '../../api/apiv2';

import { setLoaderState } from '../../store/allSlice/allSlice';
import Loader from './Loader';

const Section = styled.section`
    width: 100%;
    max-width: 1440px;
    height: 100%;
    margin: 0 auto;
    display: flex; 
    flex-direction: column;
`;
const ContentWrapper = styled.div`
  display: flex;
  height: 100%;
  padding: 40px 80px 60px;
  gap: 40px;
  box-sizing: border-box;
`;

const MainLayout: FC = () => {
  const { data, error, isLoading } = useGetCurrentUserQuery();
  const { isLoaderRun } = useSelector((state) => state.all);
  const dispatch = useDispatch();

  if (isLoading) return <Loader />;
  if (error) return <Navigate to='/login' />;

  return (

    <Section>
      <Header />
      <ContentWrapper>
        <Sidebar />
        <Outlet />
      </ContentWrapper>
    </Section>

  );
};

export default MainLayout;
