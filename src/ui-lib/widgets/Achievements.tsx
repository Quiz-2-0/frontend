/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import {
  Title,
  Headline,
  Div,
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import StyledDiv from '../styled-components/StyledDiv';
import { ArrowIcon } from '../styled-components/icons';
import { useGetShortAchievementsQuery } from '@/api/apiv2';
import { SRC_BASE_URL } from '@/constants/api-url';

const AchievementsTitleWrapper = styled(Div)`
  width: 100%;
  padding: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
`;

const AchievementContainer = styled(Div)`
  padding: 0;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const AchievementImgWrapper = styled(Div)`
  padding: 0;
  height: 80px;
  display: flex;
  flex-wrap: wrap;
`;

const AchievementImg = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  transition: transform 0.5s;
  margin: 0 -8px;
`;

const StyledHeadline = styled(Headline)`
  color: #818C99;
`;

export const StyledNavButton = styled.button`
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
  const { data: shortAchievements } = useGetShortAchievementsQuery();

  return (
    <StyledDiv
      style={{
        width: '318px',
        height: '202px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        gap: '38px',
      }}>
      <AchievementsTitleWrapper>
        <Title
          style={{ textAlign: 'left' }}
          level='2'>
          Ачивки
        </Title>
        <StyledNavButton type='button' onClick={() => navigate('/achievements')}><ArrowIcon /></StyledNavButton>
      </AchievementsTitleWrapper>
      <AchievementContainer>
        {shortAchievements && shortAchievements.length === 0 ? (
          <StyledHeadline>У вас пока нет ачивок</StyledHeadline>
        ) : (
          <AchievementImgWrapper>
            {shortAchievements?.map((shortAchievement) => (
              <AchievementImg
                key={shortAchievement.name}
                src={`${SRC_BASE_URL}${shortAchievement.image}`}
                alt={shortAchievement.name} />
            ))}
          </AchievementImgWrapper>
        )}
      </AchievementContainer>
    </StyledDiv>
  );
};

export default Achievements;
