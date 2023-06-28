import React from 'react';
import { useLocation } from 'react-router-dom';
import { SplitLayout, SplitCol, Title } from '@vkontakte/vkui';
import styled from 'styled-components';
import '@vkontakte/vkui/dist/vkui.css';
import Login from '../pages/Login';
import ResetPassword from '../pages/ResetPassword';
import Logo from './Logo';
import backgroundImage from '../images/login__image.png';

const LayoutWithColumns: React.FC = () => {
  const location = useLocation();

  const StyledColumn = styled(SplitCol)`
    background-image: url(${backgroundImage});
    background-repeat: no-repeat;
    background-size: cover;
    max-width: 885px;
    width: 100%;
    box-sizing: border-box;
  `;

  return (
    <SplitLayout>
      <StyledColumn>
        <Title
          style={{
            paddingTop: '49px',
            color: '#FFF',
            textAlign: 'center',
            fontSize: '75px',
            fontFamily: 'AlethiaPro',
            fontWeight: '400',
            lineHeight: '100px',
            letterSpacing: '-0.24px',
          }}>
          Учись играя
        </Title>
      </StyledColumn>
      <SplitCol
        maxWidth={555}
        style={{
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '71px',
        }}>
        <Logo style={{ marginTop: '60px' }} to='/' />
        {location.pathname === '/reset-password'
          ? <ResetPassword />
          : <Login />}
      </SplitCol>
    </SplitLayout>
  );
};

export default LayoutWithColumns;
