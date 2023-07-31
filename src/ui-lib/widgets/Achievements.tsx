/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import {
  Title,
  Div,
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import StyledDiv from '../StyledDiv';
import { ArrowIcon } from '../icons';
import achieveEasyStart from '../../images/achievements-img/achieve_easy_start.png';
import achieveSoftKiller from '../../images/achievements-img/achieve_soft_killer.png';
import achieveSuperSpeed from '../../images/achievements-img/achieve_super_speed.png';
import achievePermanence from '../../images/achievements-img/achieve_permanence.png';

const AchievementImg = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  position: absolute;
  transition: transform 0.5s;
`;

const StyledNavButton = styled.button`
  margin: 0;
  padding: 0;
  width: 28px;
  height: 28px;
  border: none;
  background-color:rgba(63, 138, 224, 0.05);
  transition: all ease .3s;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: rgba(63, 138, 224, 0.15);
  }
`;

const Achievements: React.FC = () => {
  const navigate = useNavigate();
  return (
    <StyledDiv
      style={{
        width: '318px',
        height: '202px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        gap: '40px',
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
          Ачивки
        </Title>
        <StyledNavButton type='button' onClick={() => navigate('/achievements')}><ArrowIcon /></StyledNavButton>
      </Div>
      <Div
        style={{
          padding: '0',
          position: 'relative',
          height: '80px',
        }}>
        <AchievementImg src={achieveEasyStart} alt='Ачивка Легкий старт' style={{ left: '0', zIndex: 3 }} />
        <AchievementImg src={achieveSoftKiller} alt='Ачивка Софт киллер' style={{ left: '64px', zIndex: 2 }} />
        <AchievementImg src={achieveSuperSpeed} alt='Ачивка Супер скорость' style={{ left: '128px', zIndex: 1 }} />
        <AchievementImg src={achievePermanence} alt='Ачивка Постоянство' style={{ left: '190px', zIndex: 0 }} />
      </Div>
    </StyledDiv>
  );
};

export default Achievements;
