import React from 'react';
import {
  Title,
  Div,
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import StyledDiv from '../StyledDiv';
import CircularProgressBar from './CircularProgressBar';
import { IconWrapper } from './Achives';
import { ArrowIcon } from '../icons';

const Progress: React.FC = () => {
  const progressPercentage = 70;

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
        <IconWrapper><ArrowIcon /></IconWrapper>
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
