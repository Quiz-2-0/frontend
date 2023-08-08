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
import { useGetQuizQuery } from '@/api/apiv2';
import StyledQuizTagContainer from '@/ui-lib/styled-components/StyledQuizTagContainer';
import StyledQuizTag from '@/ui-lib/styled-components/StyledQuizTag';
import StyledQuizDetailsWrapper from '@/ui-lib/styled-components/StyledDetailsWrapper';
import StyledQuizDetailWrapper from '@/ui-lib/styled-components/StyledQuizDetailWrapper';
import StyledQuizDetailCaption from '@/ui-lib/styled-components/StyledQuizDeteilCaption';
import BackButton from '@/ui-lib/styled-components/BackButton';
import ButtonIcon from '@/ui-lib/styled-components/ButtonIcon';
import buttonIcon from '@/assets/images/icons/button_icon.svg';
import { DurationIcon, LevelIcon, QuestionsIcon } from '@/ui-lib/styled-components/icons';
import ListForQuiz from '@/ui-lib/widgets/ListForQuiz';
import { setLoaderState } from '@/store/allSlice/allSlice';

const StyledButton = styled(Button)`
  border-radius: 4px;
  padding: 0 20px;
  max-width: max-content;
  height: 40px;

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
          </Div>
          <Div style={{
            padding: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: '25px',
          }}>
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
                  {`${data?.question_amount} вопрос${data && data?.question_amount > 4 ? 'ов' : 'а'}`}
                </StyledQuizDetailCaption>
              </StyledQuizDetailWrapper>
            </StyledQuizDetailsWrapper>
            <StyledButton onClick={() => { dispatch(setLoaderState(true)); navigate(`/quizzes/${id}/question`); }}>
              {data?.isPassed ? 'Пройти снова' : 'Начать квиз'}
            </StyledButton>
          </Div>
        </Div>
        <img
          style={{
            maxWidth: '510px',
            width: '100%',
            height: '284px',
            borderRadius: '8px',
          }}
          src={data?.image}
          alt={data?.name} />
      </Div>
      <ListForQuiz volumes={data?.volumes} />
    </Div>
  );
};

export default Quiz;
