/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable camelcase */
import React from 'react';
import styled from 'styled-components';
import {
  Headline,
  Div,
  Button,
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import { useNavigate } from 'react-router';
import { DurationIcon, LevelIcon, QuestionsIcon } from '../icons';
import StyledQuizDetailsWrapper from '../StyledDetailsWrapper';
import StyledQuizDetailWrapper from '../StyledQuizDetailWrapper';
import StyledQuizDetailCaption from '../StyledQuizDeteilCaption';
import StyledQuizTag from '../StyledQuizTag';
import StyledQuizTagContainer from '../StyledQuizTagContainer';
import { QuizCardProps } from '../../types/types';

const StyledQuizContainer = styled.li`
  list-style: none;
  width: 330px;
  height: 322px;
  padding: 0;
  margin: 0;
  overflow: hidden;
  position: relative;
  border-radius: 16px;
  background: var(--white-white, #FFF);
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.06), 0 4px 8px 0 rgba(0, 0, 0, 0.04);
  cursor: pointer;

  &:hover {
    .cover {
      opacity: 0.5;
      transform: scale(1.3);
    }
    
    .info {
      transform: translateY(-55px);
      -webkit-transform: translateY(-55px);
      -moz-transform: translateY(-55px);
      -o-transform: translateY(-55px);
      -ms-transform: translateY(-55px);
    }
    
    .btn {
      opacity: 1;
      visibility: visible;
      transition-delay: 0s;
    }
  }
`;

const StyledQuizCover = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 330px;
  height: 174px;
  object-fit: cover;
  transition: all 4s ease;
  -webkit-transition: all 4s ease;
  -moz-transition: all 4s ease;
  -o-transition: all 4s ease;
  -ms-transition: all 4s ease;
`;

const StyledQuizInfoWrapper = styled(Div)`
  padding: 12px 16px 20px;
  width: 100%;
  background-color: #ffffff;
  box-sizing: border-box;
  position: absolute;
  top: 178px;
  left: 0;
  transition: all 0.4s ease-in-out;
  -webkit-transition: all 0.4s ease-in-out;
  -moz-transition: all 0.4s ease-in-out;
  -o-transition: all 0.4s ease-in-out;
  -ms-transition: all 0.4s ease-in-out;
`;

const StyledButton = styled(Button)`
  width: 100%;
  height: 40px;
  border-radius: 4px;
  background-color: #5181B8;
  margin-top: 20px;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.4s ease-in-out, visibility 0s ease-in-out 0.4s;
  -webkit-transition: opacity 0.4s ease-in-out, visibility 0s ease-in-out 0.4s;
  -moz-transition: opacity 0.4s ease-in-out, visibility 0s ease-in-out 0.4s;
  -o-transition: opacity 0.4s ease-in-out, visibility 0s ease-in-out 0.4s;
  -ms-transition: opacity 0.4s ease-in-out, visibility 0s ease-in-out 0.4s;
`;

const QuizCard: React.FC<QuizCardProps> = (
  {
    id,
    image,
    title,
    description,
    duration,
    level,
    question_amount,
    tags,
  },
) => {
  const navigate = useNavigate();
  const onButtonClick = () => {
    navigate(`/quizzes/${id}`);
  };

  return (
    <StyledQuizContainer>
      {tags === null
        ? null
        : (
          <StyledQuizTagContainer style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            zIndex: '2',
          }}>
            {tags.map((tag: any) => (
              <StyledQuizTag
                style={{ backgroundColor: `${tag.color}`, opacity: '.8' }}>
                {tag.name}
              </StyledQuizTag>
            ))}
          </StyledQuizTagContainer>
        )}
      <StyledQuizCover src={image} alt={title} className='cover' />
      <StyledQuizInfoWrapper className='info'>
        <Headline
          weight='1'
          style={{
            letterSpacing: '-0.3px',
          }}>
          {title}
        </Headline>
        <Headline
          style={{
            padding: '4px 0 0 0',
            display: 'inline-block',
            minHeight: '60px',
            letterSpacing: '-0.2px',
          }}>
          {description}
        </Headline>
        <StyledQuizDetailsWrapper>
          <StyledQuizDetailWrapper>
            <DurationIcon />
            <StyledQuizDetailCaption>{`${duration} минут`}</StyledQuizDetailCaption>
          </StyledQuizDetailWrapper>
          <StyledQuizDetailWrapper>
            <LevelIcon />
            <StyledQuizDetailCaption>{level}</StyledQuizDetailCaption>
          </StyledQuizDetailWrapper>
          <StyledQuizDetailWrapper>
            <QuestionsIcon />
            <StyledQuizDetailCaption>{`${question_amount} вопросов`}</StyledQuizDetailCaption>
          </StyledQuizDetailWrapper>
        </StyledQuizDetailsWrapper>
        <StyledButton className='btn' onClick={onButtonClick}>Начать квиз</StyledButton>
      </StyledQuizInfoWrapper>
    </StyledQuizContainer>
  );
};

export default QuizCard;
