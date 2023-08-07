import React from 'react';
import styled from 'styled-components';
import {
  Title,
  Caption,
  Text,
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import CircularProgressBar from './CircularProgressBar';
import StyledDiv from '../styled-components/StyledDiv';
import { StyledNavButton } from './Achievements';
import {
  ArrowIcon,
  QuizIcon,
  TrueIcon,
  TimeIcon,
  BattleIcon,
} from '../styled-components/icons';

const StyledTitle = styled.h3`
  margin: 0;
  padding: 0;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px;
  letter-spacing: 0.38px;
  color: #000000;
`;

const StyledSubtitle = styled.h3`
  margin: 0;
  padding: 0;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: -0.32px;
  color: #000000;
`;

const ProgressBarWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 12px;
`;

const IndicesContainer = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 14px;
  row-gap: 24px;
  justify-items: end;
  align-items: start;
`;

const IndexWrapper = styled.li`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 12px;
`;

const ProgressTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 4px;
`;

const ProgressTitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-end;
  gap: 4px;
`;

const IconBackground = styled.span`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background-color: #F5F9FD;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const StyledCaption = styled(Caption)`
  font-size: 13px;
  line-height: 16px;
  font-weight: 400;
  letter-spacing: -0.078px;
  color: #818C99;
`;

const LearningProgress: React.FC = () => {
  const progressPercentage = 70;

  return (
    <StyledDiv>
      <div
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
        <StyledNavButton type='button'><ArrowIcon /></StyledNavButton>
      </div>
      <div
        style={{
          width: '100%',
          padding: '0',
          margin: '26px 0 0',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <ProgressBarWrapper>
          <CircularProgressBar percentage={progressPercentage} />
          <ProgressTextWrapper>
            <ProgressTitleWrapper>
              <StyledTitle>5</StyledTitle>
              <StyledSubtitle>назначенных квизов</StyledSubtitle>
            </ProgressTitleWrapper>
            <StyledCaption>успешно завершено</StyledCaption>
          </ProgressTextWrapper>
        </ProgressBarWrapper>
        <IndicesContainer>
          <IndexWrapper>
            <IconBackground><QuizIcon /></IconBackground>
            <ProgressTextWrapper>
              <ProgressTitleWrapper>
                <StyledTitle>5</StyledTitle>
                <StyledSubtitle>квизов</StyledSubtitle>
              </ProgressTitleWrapper>
              <StyledCaption>всего пройдено</StyledCaption>
            </ProgressTextWrapper>
          </IndexWrapper>
          <IndexWrapper>
            <IconBackground><TrueIcon /></IconBackground>
            <ProgressTextWrapper>
              <ProgressTitleWrapper>
                <Title>80</Title>
                <Text>%</Text>
              </ProgressTitleWrapper>
              <StyledCaption>верных ответов</StyledCaption>
            </ProgressTextWrapper>
          </IndexWrapper>
          <IndexWrapper>
            <IconBackground><TimeIcon /></IconBackground>
            <ProgressTextWrapper>
              <ProgressTitleWrapper>
                <Title>20</Title>
                <Text>минут</Text>
              </ProgressTitleWrapper>
              <StyledCaption>на прохождение</StyledCaption>
            </ProgressTextWrapper>
          </IndexWrapper>
          <IndexWrapper>
            <IconBackground><BattleIcon /></IconBackground>
            <ProgressTextWrapper>
              <ProgressTitleWrapper>
                <Title>3</Title>
                <Text>победы</Text>
              </ProgressTitleWrapper>
              <StyledCaption>в квиз-баттлах</StyledCaption>
            </ProgressTextWrapper>
          </IndexWrapper>
        </IndicesContainer>
      </div>
    </StyledDiv>
  );
};

export default LearningProgress;
