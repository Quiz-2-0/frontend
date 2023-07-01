import React, { FC } from 'react';
import styled from 'styled-components';
import { Navigate, Outlet } from 'react-router';
import Header from './Header';
import Sidebar from './Sidebar';
import { useSelector } from '../../store/store.types';
import { useGetCurrentUserQuery, useLoginMutation } from '../../api/apiv2';

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
  const [login, { data, error }] = useLoginMutation({
    fixedCacheKey: 'shared-update-post',
  });
  return (
    localStorage.getItem('JWT') || sessionStorage.getItem('JWT')
      ? (
        <Section>
          <Header />
          <ContentWrapper>
            <Sidebar />
            <Outlet />
          </ContentWrapper>
        </Section>
      )
      : <Navigate to='/login' />
  );
};

export default MainLayout;
