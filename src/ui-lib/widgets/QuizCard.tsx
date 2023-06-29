import React from 'react';
import styled from 'styled-components';
import {
  Headline,
  Caption,
  Div,
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import StyledDiv from '../StyledDiv';
import { DurationIcon, LevelIcon, QuestionsIcon } from '../icons';

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

const QuizCard: React.FC = () => (
  <StyledDiv
    style={{
      width: '330px',
      padding: '0',
      overflow: 'hidden',
      position: 'relative',
    }}>
    <StyledQuizTag>Софт Скиллс</StyledQuizTag>
    <StyledQuizCover src='../images/work_and_life_balance.png' alt='Человек в отпуске' />
    <StyledQuizInfoWrapper>
      <Headline
        weight='1'
        style={{
          letterSpacing: '-0.55px',
        }}>
        Баланс работы и личной жизни
      </Headline>
      <Headline
        style={{
          padding: '4px 0 0 0',
          display: 'inline-block',
          minHeight: '60px',
          letterSpacing: '-0.9px',
        }}>
        Подскажет, как не перегореть на работе.
      </Headline>
      <StyledQuizDetailsWrapper>
        <StyledQuizDetailWrapper>
          <DurationIcon />
          <StyledQuizDetailCaption>20 минут</StyledQuizDetailCaption>
        </StyledQuizDetailWrapper>
        <StyledQuizDetailWrapper>
          <LevelIcon />
          <StyledQuizDetailCaption>Лёгкий</StyledQuizDetailCaption>
        </StyledQuizDetailWrapper>
        <StyledQuizDetailWrapper>
          <QuestionsIcon />
          <StyledQuizDetailCaption>10 вопросов</StyledQuizDetailCaption>
        </StyledQuizDetailWrapper>
      </StyledQuizDetailsWrapper>
    </StyledQuizInfoWrapper>
  </StyledDiv>
);

export default QuizCard;
