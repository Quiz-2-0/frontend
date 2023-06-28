import React, { FC } from 'react';
import styled from 'styled-components';
import { Outlet } from 'react-router';
import Header from './Header';
import Sidebar from './Sidebar';
import { useSelector } from '../../store/store.types';

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
    
    gap: 40px;
    padding-right: 80px;
  
    padding-top: 40px;
   
`;

const MainLayout: FC = () => {
  const { isLogged } = useSelector((state) => state.all);
  /// на будущий токен
  /*  if (!isLogged) { return null; } */
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
