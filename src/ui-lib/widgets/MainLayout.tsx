import React, { FC } from 'react';
import styled from 'styled-components';
import { Navigate, Outlet, useNavigate } from 'react-router';
import Header from './Header';
import Sidebar from './Sidebar';
import { useSelector } from '../../store/store.types';
import { jwt, useGetCurrentUserQuery, useLoginMutation } from '../../api/apiv2';

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
  const navigate = useNavigate();
  const { data, error, isLoading } = useGetCurrentUserQuery();

  if (isLoading) return <div>gjgjgjgjgjgj</div>;
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
