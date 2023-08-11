import React, { FC, PropsWithChildren } from 'react';
import { SplitLayout, SplitCol, Title } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import { Outlet } from 'react-router';
import Logo from '../styled-components/Logo';
import backgroundImage from '@/assets/images/login__image.png';

const AuthLayout: FC<PropsWithChildren> = ({ children }) => (
  <SplitLayout
    style={{
      minHeight: '100vh',
      alignContent: 'stretch',
    }}>
    <SplitCol
      width='64%'
      style={{
        height: 'auto',
        background: `url(${backgroundImage as string}) no-repeat center`,
        backgroundSize: 'cover',
      }}>
      <Title
        style={{
          paddingTop: '42px',
          color: '#FFF',
          textAlign: 'center',
          font: '75px/100px AlethiaPro',
          fontWeight: 400,
          letterSpacing: '-0.24px',
        }}>
        Учись играя
      </Title>
    </SplitCol>
    <SplitCol
      width='36%'
      maxWidth='555px'
      minWidth='360px'
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '71px',
        height: 'auto',
      }}>
      <>
        <Logo style={{ marginTop: '60px', width: '155px', height: '95px' }} to='/' />
        { children && <Outlet /> }
      </>
    </SplitCol>
  </SplitLayout>
);

export default AuthLayout;
