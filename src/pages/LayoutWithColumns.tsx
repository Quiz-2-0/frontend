import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { SplitLayout, SplitCol, Title } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import Login from './Login';
import ResetPassword from './ResetPassword';

const LayoutWithColumns: React.FC = () => {
  const location = useLocation();

  return (
    <SplitLayout>
      <SplitCol className='column-with-image'>
        <Title
          style={{
            paddingTop: '49px',
            color: '#FFF',
            textAlign: 'center',
            fontSize: '110px',
            fontFamily: 'AlethiaPro',
            fontWeight: '400',
            lineHeight: '100px',
            letterSpacing: '-0.24px',
          }}>
          Учись играя
        </Title>
      </SplitCol>
      <SplitCol
        maxWidth={555}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '71px',
        }}>
        <NavLink className='logo' to='/' />
        {location.pathname === '/reset-password'
          ? <ResetPassword />
          : <Login />}
      </SplitCol>
    </SplitLayout>
  );
};

export default LayoutWithColumns;
