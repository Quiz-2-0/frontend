/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { FC } from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import { Div, Title } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import ButtonIcon from '../ui-lib/ButtonIcon';
import buttonIcon from '../images/icons/button_icon.svg';
import BackButton from '../ui-lib/BackButton';
import achieveEasyStart from '../images/achievements-img/achieve_easy_start.png';
import achieveSoftKiller from '../images/achievements-img/achieve_soft_killer.png';
import achieveAugustChallenge from '../images/achievements-img/achieve_august_challenge.png';
import achievePermanence from '../images/achievements-img/achieve_permanence.png';
import achieveSuperAccuracy from '../images/achievements-img/achieve_super_accuracy.png';
import achieveSuperSpeed from '../images/achievements-img/achieve_super_speed.png';
import achieve5QuizzesInARow from '../images/achievements-img/achieve_5_quizzez_in_a_row.png';
import achieveSoftSkillsGuru from '../images/achievements-img/achieve_soft_skills_guru.png';

const Container = styled(Div)`
    max-width: 1074px;
    width: 100%;
    padding: 0;
`;

const AchievementsWrapper = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 40px;
  justify-items: start;
  align-items: start;
  justify-content: start;
  align-content: start;
`;

const AchieveDiv = styled.li`
  width: 232px;
  height: 274px;
  padding: 24px;
  margin: 0;
  list-style: none;
  box-sizing: border-box;
  border-radius: 16px;
  background: var(--white-white, #FFF);
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.06), 0 4px 8px 0 rgba(0, 0, 0, 0.04);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

const AchieveCounter = styled(Title)`
  align-self: flex-end;
`;

const AchieveImg = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin: 8px 0 20px;
`;

const AchievementsPage: FC = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <BackButton type='button' onClick={() => navigate('/quizzes')}>
        <ButtonIcon src={buttonIcon} alt='Стрелочка назад' />
        Назад
      </BackButton>
      <Title level='2' style={{ margin: '32px 0' }}>Ачивки</Title>
      <AchievementsWrapper>
        <AchieveDiv>
          <AchieveCounter level='3'>1/1</AchieveCounter>
          <AchieveImg src={achieveEasyStart} alt='Ачивка Легкий старт' />
          <Title level='3'>Лёгкий старт</Title>
        </AchieveDiv>
        <AchieveDiv>
          <AchieveCounter level='3'>5/5</AchieveCounter>
          <AchieveImg src={achieveSoftKiller} alt='Ачивка Софт киллер' />
          <Title level='3'>Софт киллер</Title>
        </AchieveDiv>
        <AchieveDiv>
          <AchieveCounter level='3'>0/10</AchieveCounter>
          <AchieveImg src={achieveAugustChallenge} alt='Ачивка Вызов августа' />
          <Title level='3'>Вызов августа</Title>
        </AchieveDiv>
        <AchieveDiv>
          <AchieveCounter level='3'>5/5</AchieveCounter>
          <AchieveImg src={achievePermanence} alt='Ачивка Постоянство' />
          <Title level='3'>Постоянство</Title>
        </AchieveDiv>
        <AchieveDiv>
          <AchieveCounter level='3'>0/3</AchieveCounter>
          <AchieveImg src={achieveSuperAccuracy} alt='Ачивка Супер точность' />
          <Title level='3'>Супер точность</Title>
        </AchieveDiv>
        <AchieveDiv>
          <AchieveCounter level='3'>1/1</AchieveCounter>
          <AchieveImg src={achieveSuperSpeed} alt='Ачивка Супер Скорость' />
          <Title level='3'>Супер скорость</Title>
        </AchieveDiv>
        <AchieveDiv>
          <AchieveCounter level='3'>0/100</AchieveCounter>
          <AchieveImg src={achieve5QuizzesInARow} alt='Ачивка 5 квизов подряд' />
          <Title level='3'>5 квизов подряд</Title>
        </AchieveDiv>
        <AchieveDiv>
          <AchieveCounter level='3'>0/100</AchieveCounter>
          <AchieveImg src={achieveSoftSkillsGuru} alt='Ачивка Гура по софтам' />
          <Title level='3'>Гуру по софтам</Title>
        </AchieveDiv>
      </AchievementsWrapper>
    </Container>
  );
};

export default AchievementsPage;
