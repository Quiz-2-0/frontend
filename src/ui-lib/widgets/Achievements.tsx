/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react';
import styled from 'styled-components';
import {
  Title,
  Div,
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import StyledDiv from '../StyledDiv';
import { IconWrapper } from './Achives';
import { ArrowIcon } from '../icons';
import achievement1 from '../../images/achievements-img/achievement_img1.png';
import achievement2 from '../../images/achievements-img/achievement_img2.png';
import achievement3 from '../../images/achievements-img/achievement_img3.png';
import achievement4 from '../../images/achievements-img/achievement_img4.png';

const AchievementImg = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  position: absolute;
  transition: transform 0.5s;
`;

const Achievements: React.FC = () => (
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
      <IconWrapper><ArrowIcon /></IconWrapper>
    </Div>
    <Div
      style={{
        padding: '0',
        position: 'relative',
        height: '80px',
      }}>
      <AchievementImg src={achievement1} alt='Ачивка Легкий старт' style={{ left: '0', zIndex: 3 }} />
      <AchievementImg src={achievement2} alt='Ачивка Легкий старт' style={{ left: '64px', zIndex: 2 }} />
      <AchievementImg src={achievement3} alt='Ачивка Легкий старт' style={{ left: '128px', zIndex: 1 }} />
      <AchievementImg src={achievement4} alt='Ачивка Легкий старт' style={{ left: '190px', zIndex: 0 }} />
    </Div>
  </StyledDiv>
);

export default Achievements;
