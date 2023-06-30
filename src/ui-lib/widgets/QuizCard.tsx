import React from 'react';
import styled from 'styled-components';
import {
  Headline,
  Caption,
  Div,
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import { DurationIcon, LevelIcon, QuestionsIcon } from '../icons';

const StyledQuizContainer = styled.li`
  list-style: none;
  width: 330px;
  padding: 0;
  margin: 0;
  overflow: hidden;
  position: relative;
  border-radius: 16px;
  background: var(--white-white, #FFF);
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.06), 0 4px 8px 0 rgba(0, 0, 0, 0.04);
  cursor: pointer;
`;

const StyledQuizCover = styled.img`
  width: 330px;
  height: 174px;
  object-fit: cover;
`;

const StyledQuizInfoWrapper = styled(Div)`
  padding: 12px 16px 20px
`;

const StyledQuizDetailWrapper = styled(Div)`
  padding: 0;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 4px;
`;

const StyledQuizDetailsWrapper = styled(Div)`
  padding: 13px 0 0 0;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 12px;
`;

const StyledQuizDetailCaption = styled(Caption)`
  font-weight: 600;
  color: #818C99;
  text-transform: uppercase;
  letter-spacing: -0.55px;
`;

const StyledQuizTag = styled.span`
  display: inline-block;
  padding: 4px;
  border-radius: 4px;
  width: fit-content;
  height: fit-content;
  background-color: rgba(80, 69, 119, 0.8);
  font-size: 11px;
  line-height: 14px;
  font-weight: 400;
  color: #ffffff;
  position: absolute;
  top: 16px;
  right: 16px;
`;

interface QuizCardProps {
  image: string;
  title: string;
  description: string;
  duration: number;
  level: string;
  questionAmount: number;
}

const QuizCard: React.FC<QuizCardProps> = (
  {
    image,
    title,
    description,
    duration,
    level,
    questionAmount,
  },
) => (
  <StyledQuizContainer>
    <StyledQuizTag>Софт Скиллс</StyledQuizTag>
    <StyledQuizCover src={image} alt={title} />
    <StyledQuizInfoWrapper>
      <Headline
        weight='1'
        style={{
          letterSpacing: '-0.3px',
        }}>
        { title }
      </Headline>
      <Headline
        style={{
          padding: '4px 0 0 0',
          display: 'inline-block',
          minHeight: '60px',
          letterSpacing: '-0.2px',
        }}>
        { description }
      </Headline>
      <StyledQuizDetailsWrapper>
        <StyledQuizDetailWrapper>
          <DurationIcon />
          <StyledQuizDetailCaption>{`${duration} минут`}</StyledQuizDetailCaption>
        </StyledQuizDetailWrapper>
        <StyledQuizDetailWrapper>
          <LevelIcon />
          <StyledQuizDetailCaption>{ level }</StyledQuizDetailCaption>
        </StyledQuizDetailWrapper>
        <StyledQuizDetailWrapper>
          <QuestionsIcon />
          <StyledQuizDetailCaption>{`${questionAmount} вопросов`}</StyledQuizDetailCaption>
        </StyledQuizDetailWrapper>
      </StyledQuizDetailsWrapper>
    </StyledQuizInfoWrapper>
  </StyledQuizContainer>
);

export default QuizCard;
