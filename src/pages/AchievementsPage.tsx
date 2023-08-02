/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { FC } from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import { Div, Title, Text } from '@vkontakte/vkui';
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

const achievements = [
  {
    id: 0,
    counterTotal: 1,
    counterAchieved: 1,
    name: 'Лёгкий старт',
    description: 'Первый раз пройти квиз из назначенных',
    img: achieveEasyStart,
    disabled: false,
  },
  {
    id: 1,
    counterTotal: 5,
    counterAchieved: 5,
    name: 'Софт киллер',
    description: 'Первый раз пройти квиз из назначенных',
    img: achieveSoftKiller,
    disabled: false,
  },
  {
    id: 2,
    counterTotal: 10,
    counterAchieved: 0,
    name: 'Вызов августа',
    description: 'Первый раз пройти квиз из назначенных',
    img: achieveAugustChallenge,
    disabled: true,
  },
  {
    id: 3,
    counterTotal: 5,
    counterAchieved: 5,
    name: 'Постоянство',
    description: 'Первый раз пройти квиз из назначенных',
    img: achievePermanence,
    disabled: false,
  },
  {
    id: 4,
    counterTotal: 3,
    counterAchieved: 0,
    name: 'Супер точность',
    description: 'Первый раз пройти квиз из назначенных',
    img: achieveSuperAccuracy,
    disabled: true,
  },
  {
    id: 5,
    counterTotal: 1,
    counterAchieved: 1,
    name: 'Супер скорость',
    description: 'Первый раз пройти квиз из назначенных',
    img: achieveSuperSpeed,
    disabled: false,
  },
  {
    id: 6,
    counterTotal: 100,
    counterAchieved: 0,
    name: '5 квизов подряд',
    description: 'Первый раз пройти квиз из назначенных',
    img: achieve5QuizzesInARow,
    disabled: true,
  },
  {
    id: 7,
    counterTotal: 100,
    counterAchieved: 0,
    name: 'Гуру по софтам',
    description: 'Первый раз пройти квиз из назначенных',
    img: achieveSoftSkillsGuru,
    disabled: true,
  },
];

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

const AchieveLi = styled.li<{ disabled: boolean }>`
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
  opacity: ${({ disabled }) => (disabled ? '.5' : '1')};
  
  &:hover {
    .counter {
      font-size: 16px;
      line-height: 20px;
    }
    
    .achieveImg {
      width: 120px;
      height: 120px;
      margin: 0 0 12px;
    }
    
    .achieveTitle {
      font-size: 16px;
      line-height: 20px;
    }
    
    .achieveDescription {
      opacity: 1;
      visibility: visible;
      transition-delay: 0s;
    }
  }
`;

const AchieveCounter = styled(Title)`
  align-self: flex-end;
  transition: all 0.4s ease-in-out;
  -webkit-transition: all 0.4s ease-in-out;
  -moz-transition: all 0.4s ease-in-out;
  -o-transition: all 0.4s ease-in-out;
  -ms-transition: all 0.4s ease-in-out;
`;

const AchieveImg = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin: 8px 0 20px;
  transition: all 0.4s ease-in-out;
  -webkit-transition: all 0.4s ease-in-out;
  -moz-transition: all 0.4s ease-in-out;
  -o-transition: all 0.4s ease-in-out;
  -ms-transition: all 0.4s ease-in-out;
`;

const AchieveTitle = styled(Title)`
  transition: all 0.4s ease-in-out;
  -webkit-transition: all 0.4s ease-in-out;
  -moz-transition: all 0.4s ease-in-out;
  -o-transition: all 0.4s ease-in-out;
  -ms-transition: all 0.4s ease-in-out;
`;

const AchieveDescription = styled(Text)`
  padding-top: 4px;
  text-align: center;
  opacity: 0;
  visibility: hidden;
  transition: all 0.4s ease-in-out;
  -webkit-transition: all 0.4s ease-in-out;
  -moz-transition: all 0.4s ease-in-out;
  -o-transition: all 0.4s ease-in-out;
  -ms-transition: all 0.4s ease-in-out;
`;

const AchievementsPage: FC = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <BackButton type='button' onClick={() => navigate('/')}>
        <ButtonIcon src={buttonIcon} alt='Стрелочка назад' />
        Назад
      </BackButton>
      <Title level='2' style={{ margin: '32px 0' }}>Ачивки</Title>
      <AchievementsWrapper>
        {achievements.map((achievement) => (
          <AchieveLi key={achievement.id} disabled={achievement.disabled}>
            <AchieveCounter level='3' className='counter'>{`${achievement.counterAchieved}/${achievement.counterTotal}`}</AchieveCounter>
            <AchieveImg src={achievement.img} alt='Ачивка Легкий старт' className='achieveImg' />
            <AchieveTitle level='3' className='achieveTitle'>{achievement.name}</AchieveTitle>
            <AchieveDescription weight='3' className='achieveDescription'>{achievement.description}</AchieveDescription>
          </AchieveLi>
        ))}
      </AchievementsWrapper>
    </Container>
  );
};

export default AchievementsPage;
