import React, { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import { Div, Title, Text } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import { useGetAchievementsQuery } from '@/api/apiv2';
import ButtonIcon from '@/ui-lib/styled-components/ButtonIcon';
import BackButton from '@/ui-lib/styled-components/BackButton';
import buttonIcon from '@/assets/images/icons/button_icon.svg';

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

const AchieveLi = styled.li<{ achieved: boolean }>`
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
  opacity: ${({ achieved }) => (achieved ? '1' : '.5')};

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
`;

const AchieveImg = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin: 8px 0 20px;
  transition: all 0.4s ease-in-out;
`;

const AchieveTitle = styled(Title)`
  transition: all 0.4s ease-in-out;
`;

const AchieveDescription = styled(Text)`
  padding-top: 4px;
  text-align: center;
  opacity: 0;
  visibility: hidden;
  transition: all 0.4s ease-in-out;
`;

const AchievementsPage: FC = () => {
  const { data } = useGetAchievementsQuery();
  const navigate = useNavigate();
  const [achievements, setAchievements] = useState(data ?? []);

  useEffect(() => {
    setAchievements(data ?? []);
  }, [data]);

  return (
    <Container>
      <BackButton type='button' onClick={() => navigate('/')}>
        <ButtonIcon src={buttonIcon} alt='Стрелочка назад' />
        Назад
      </BackButton>
      <Title level='2' style={{ margin: '32px 0' }}>Ачивки</Title>
      <AchievementsWrapper>
        {achievements.map((achievement) => (
          <AchieveLi key={achievement.id} achieved={achievement.achived}>
            <AchieveCounter level='3' className='counter'>{`${achievement.points_now}/${achievement.points_to_get}`}</AchieveCounter>
            <AchieveImg src={achievement.image} alt={achievement.name} className='achieveImg' />
            <AchieveTitle level='3' className='achieveTitle'>{achievement.name}</AchieveTitle>
            <AchieveDescription weight='3' className='achieveDescription'>{achievement.description}</AchieveDescription>
          </AchieveLi>
        ))}
      </AchievementsWrapper>
    </Container>
  );
};

export default AchievementsPage;
