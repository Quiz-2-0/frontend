/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable no-nested-ternary */
/* eslint-disable ternary/nesting */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  Headline,
  Div,
  Button,
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import { Icon24DeleteOutline } from '@vkontakte/icons';
import { useNavigate } from 'react-router';
import { DurationIcon, LevelIcon, QuestionsIcon } from '../styled-components/icons';
import StyledQuizDetailsWrapper from '../styled-components/StyledDetailsWrapper';
import StyledQuizDetailWrapper from '../styled-components/StyledQuizDetailWrapper';
import StyledQuizDetailCaption from '../styled-components/StyledQuizDeteilCaption';
import StyledQuizTag from '../styled-components/StyledQuizTag';
import StyledQuizTagContainer from '../styled-components/StyledQuizTagContainer';
import { QuizCardProps } from '@/types/types';
import { pluralsFull } from '@/constants/plurals';
import ConfirmationPopup from '../popups/ConfirmationPopup';
import { useGetLevelsQuery } from '@/api/apiv2';

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

    .btn, .btns {
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
  box-sizing: border-box;
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

  & > .vkuiButton__in > .vkuiButton__content {
    padding: 0 !important;
  }
`;

const Buttons = styled.div`
  width: 100%;
  minHeight: 36px;
  display: flex;
  justify-content: space-between;
  gap: 8px;
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
    isPassed,
    isIncomplete,
  },
) => {
  const { data: quizLevels } = useGetLevelsQuery();
  const [levels, setLevels] = useState(quizLevels ?? []);
  const navigate = useNavigate();
  const onButtonClick = () => {
    navigate(`/quizzes/${id}`);
  };
  const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = useState(false);
  useEffect(() => {
    setLevels(quizLevels ?? []);
  });

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
            <StyledQuizDetailCaption>
              {pluralsFull.minutes(duration)}
            </StyledQuizDetailCaption>
          </StyledQuizDetailWrapper>
          <StyledQuizDetailWrapper>
            <LevelIcon />
            <StyledQuizDetailCaption>
              {levels.find((item) => item.id === Number(level))?.name ?? ''}
            </StyledQuizDetailCaption>
          </StyledQuizDetailWrapper>
          <StyledQuizDetailWrapper>
            <QuestionsIcon />
            <StyledQuizDetailCaption>
              {pluralsFull.questions(question_amount)}
            </StyledQuizDetailCaption>
          </StyledQuizDetailWrapper>
        </StyledQuizDetailsWrapper>
        {isPassed !== ''
          ? (
            <StyledButton className='btn' onClick={onButtonClick}>{isPassed ? 'Пройти снова' : isIncomplete ? 'Продолжить квиз' : 'Начать квиз'}</StyledButton>
          ) : (
            <Buttons className='btns'>
              <StyledButton
                className='btn'
                style={{ minWidth: '242px', minHeight: '36px' }}
                onClick={() => navigate(`/new-quiz/${id}`)}>
                Продолжить создание
              </StyledButton>
              <StyledButton
                className='btn'
                style={{ maxWidth: '48px', minWidth: '40px', minHeight: '36px' }}
                onClick={() => setIsConfirmationPopupOpen(true)}>
                <Icon24DeleteOutline fill='#fff' />
              </StyledButton>
            </Buttons>
          )}
      </StyledQuizInfoWrapper>
      <ConfirmationPopup
        quizId={id}
        isConfirmationPopupOpen={isConfirmationPopupOpen}
        setIsConfirmationPopupOpen={setIsConfirmationPopupOpen}
        setIsChooseQuizzesPopupOpen={NaN}
        title='Удаление черновика'
        icon='delete'
        description='Хотите навсегда удалить черновик квиза?'
        blueButton='Подтвердить'
        whiteButton='Отменить'
        blueButtonLink=''
        whiteButtonLink='' />
    </StyledQuizContainer>
  );
};

export default QuizCard;
