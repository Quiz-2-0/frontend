import React from 'react';
import styled from 'styled-components';
import {
  Headline,
  Caption,
  Div,
  Button,
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import { DurationIcon, LevelIcon, QuestionsIcon } from '../icons';

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
      height: 119px;
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
  transition: height 0.3s ease-in-out;
  -webkit-transition: height 0.3s ease-in-out;
  -moz-transition: height 0.3s ease-in-out;
  -o-transition: height 0.3s ease-in-out;
  -ms-transition: height 0.3s ease-in-out;
`;

const StyledQuizInfoWrapper = styled(Div)`
  padding: 12px 16px 20px;
  position: absolute;
  top: 178px;
  left: 0;
  transition: transform 0.3s ease-in-out;
  -webkit-transition: transform 0.3s ease-in-out;
  -moz-transition: transform 0.3s ease-in-out;
  -o-transition: transform 0.3s ease-in-out;
  -ms-transition: transform 0.3s ease-in-out;
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

const StyledQuizTagContainer = styled.ul`
  margin: 0;
  padding: 0 0 0 16px;
  list-style: none;
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-end;
  align-items: flex-start;
  gap: 8px;
  position: absolute;
  top: 16px;
  right: 16px;
  z-index: 2;
`;

const StyledQuizTag = styled.span`
  display: block;
  padding: 4px;
  border-radius: 4px;
  width: fit-content;
  height: fit-content;
  background-color: rgba(80, 69, 119, 0.8);
  font-size: 11px;
  line-height: 14px;
  font-weight: 400;
  color: #ffffff;
`;

const StyledButton = styled(Button)`
  width: 100%;
  height: 40px;
  border-radius: 4px;
  background-color: #5181B8;
  margin-top: 20px;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease-in-out, visibility 0s ease-in-out 0.3s;
  -webkit-transition: opacity 0.3s ease-in-out, visibility 0s ease-in-out 0.3s;
  -moz-transition: opacity 0.3s ease-in-out, visibility 0s ease-in-out 0.3s;
  -o-transition: opacity 0.3s ease-in-out, visibility 0s ease-in-out 0.3s;
  -ms-transition: opacity 0.3s ease-in-out, visibility 0s ease-in-out 0.3s;
`;

interface QuizCardProps {
  image: string;
  title: string;
  description: string;
  duration: number;
  level: string;
  questionAmount: number;
  tags: string[];
}

const QuizCard: React.FC<QuizCardProps> = (
  {
    image,
    title,
    description,
    duration,
    level,
    questionAmount,
    tags,
  },
) => {
  const backgroundStyleByTag = (tag: string): { bgColor: string } => {
    const bgStyleMap: { [key: string]: string } = {
      Коммуникация: 'rgba(99, 185, 186, 0.8)',
      Новый: 'rgba(255, 51, 71, 0.80)',
    };

    let bgStyle = 'rgba(80, 69, 119, 0.8)';
    if (Object.prototype.hasOwnProperty.call(bgStyleMap, tag)) {
      bgStyle = bgStyleMap[tag];
    }

    return {
      bgColor: bgStyle,
    };
  };

  return (
    <StyledQuizContainer>
      {tags === null
        ? null
        : (
          <StyledQuizTagContainer>
            {tags.map((tag) => {
              const style = backgroundStyleByTag(tag);
              return (
                <StyledQuizTag
                  style={{ backgroundColor: style.bgColor }}>
                  {tag}
                </StyledQuizTag>
              );
            })}
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
            <StyledQuizDetailCaption>{`${questionAmount} вопросов`}</StyledQuizDetailCaption>
          </StyledQuizDetailWrapper>
        </StyledQuizDetailsWrapper>
        <StyledButton className='btn'>Начать квиз</StyledButton>
      </StyledQuizInfoWrapper>
    </StyledQuizContainer>
  );
};

export default QuizCard;
