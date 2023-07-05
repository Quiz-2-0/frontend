/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import React, { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import {
  Div,
  Title,
  Text,
  Button,
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import { useGetQuizQuery } from '../api/apiv2';
import StyledQuizTagContainer from '../ui-lib/StyledQuizTagContainer';
import StyledQuizTag from '../ui-lib/StyledQuizTag';
import StyledQuizDetailsWrapper from '../ui-lib/StyledDetailsWrapper';
import StyledQuizDetailWrapper from '../ui-lib/StyledQuizDetailWrapper';
import StyledQuizDetailCaption from '../ui-lib/StyledQuizDeteilCaption';
import BackButton from '../ui-lib/BackButton';
import ButtonIcon from '../ui-lib/ButtonIcon';
import buttonIcon from '../images/icons/button_icon.svg';
import { DurationIcon, LevelIcon, QuestionsIcon } from '../ui-lib/icons';
import ListForQuiz from '../ui-lib/widgets/ListForQuiz';
import { setLoaderState } from '../store/allSlice/allSlice';

const StyledButton = styled(Button)`
  border-radius: 4px;
  padding: 10px 20px;
  max-width: max-content;

  & > .vkuiButton__in > .vkuiButton__content {
    padding: 0;
    font-size: 15px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px;
    letter-spacing: -0.24px;

  }
`;

const Quiz: React.FC = () => {
  const { id } = useParams();
  const { data, error, isLoading } = useGetQuizQuery(id);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <Div style={{ padding: 0, width: '100%' }}>
      <BackButton type='button' onClick={() => navigate('/quizzes')}>
        <ButtonIcon src={buttonIcon} alt='Стрелочка назад' />
        Назад
      </BackButton>
      <Div style={{
        padding: '30px 0 74px',
        display: 'flex',
        justifyContent: 'space-between',
        gap: '40px',
      }}>
        <Div style={{
          padding: 0,
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          minHeight: '200px',
        }}>
          <Div style={{ padding: 0 }}>
            <Div style={{
              padding: '0 0 12px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
              <Title>{data?.name}</Title>
              {data?.tags === null ? null : (
                <StyledQuizTagContainer>
                  {data?.tags.map((tag: any) => (
                    <StyledQuizTag style={{ backgroundColor: `${tag.color}` }}>
                      {tag.name}
                    </StyledQuizTag>
                  ))}
                </StyledQuizTagContainer>
              )}
            </Div>
            <Text style={{ fontSize: '16px' }}>{data?.description}</Text>
            <StyledQuizDetailsWrapper style={{ paddingTop: '24px' }}>
              <StyledQuizDetailWrapper>
                <DurationIcon />
                <StyledQuizDetailCaption>
                  {`${data?.duration} минут`}
                </StyledQuizDetailCaption>
              </StyledQuizDetailWrapper>
              <StyledQuizDetailWrapper>
                <LevelIcon />
                <StyledQuizDetailCaption>
                  {data?.level}
                </StyledQuizDetailCaption>
              </StyledQuizDetailWrapper>
              <StyledQuizDetailWrapper>
                <QuestionsIcon />
                <StyledQuizDetailCaption>
                  {`${data?.question_amount} вопросов`}
                </StyledQuizDetailCaption>
              </StyledQuizDetailWrapper>
            </StyledQuizDetailsWrapper>
          </Div>
          <StyledButton onClick={() => { dispatch(setLoaderState(true)); navigate(`/quizzes/${id}/question`); }}>Начать квиз</StyledButton>
        </Div>
        <img style={{ maxWidth: '510px', width: '100%', borderRadius: '8px' }} src={data?.image} alt={data?.name} />
      </Div>
      <ListForQuiz volumes={data?.volumes} />
    </Div>
  );
};

export default Quiz;
