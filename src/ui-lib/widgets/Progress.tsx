import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import {
  Title,
  Div,
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import StyledDiv from '../StyledDiv';
import CircularProgressBar from './CircularProgressBar';

export const StyledNavLink = styled(NavLink)`
  display: block;
  width: 28px;
  height: 28px;
  background-color: rgba(63, 138, 224, 0.05);
  border-radius: 4px;
  background-image: url('../images/navlink_icon.svg');
  background-size: 7px 12px;
  background-repeat: no-repeat;
  background-position: center;
`;

const Progress: React.FC = () => {
  const progressPercentage = 75;

  return (
    <StyledDiv
      style={{
        width: '318px',
        height: '226px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        gap: '26px',
      }}>
      <Div
        style={{
          width: '100%',
          padding: '0',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
        }}>
        <Title
          style={{ textAlign: 'left' }}
          level='2'>
          Прогресс обучения
        </Title>
        <StyledNavLink to='#' />
      </Div>
      <Div
        style={{
          width: '100%',
          padding: '0',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '16px',
        }}>
        <Div
          style={{
            padding: '0',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            gap: '12px',
          }}>
          <Div
            style={{
              padding: '0',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              gap: '20px',
            }}>
            <Title level='2' weight='3'>Назначено</Title>
            <Title level='2' weight='3'>10</Title>
          </Div>
          <Div
            style={{
              padding: '0',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              gap: '20px',
            }}>
            <Title level='2' weight='3'>Завершено</Title>
            <Title level='2' weight='3'>7</Title>
          </Div>
          <Div
            style={{
              padding: '0',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              gap: '20px',
            }}>
            <Title level='2' weight='3'>В процессе</Title>
            <Title level='2' weight='3'>3</Title>
          </Div>
        </Div>
        <CircularProgressBar percentage={progressPercentage} />
      </Div>
    </StyledDiv>
  );
};

export default Progress;
