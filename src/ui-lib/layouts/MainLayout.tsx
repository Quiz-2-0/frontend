import React, { FC } from 'react';
import styled from 'styled-components';
import { Navigate, Outlet } from 'react-router';
import Header from '../widgets/Header';
import Sidebar from '../widgets/Sidebar';
import { useGetCurrentUserQuery } from '@/api/apiv2';

import Loader from '../widgets/Loader';

const Section = styled.section`
    width: 100%;
    max-width: 1440px;
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
  const { error, isLoading } = useGetCurrentUserQuery();

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
