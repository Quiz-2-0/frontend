/* eslint-disable camelcase */
/* eslint-disable ternary/no-unreachable */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import {
  Div,
  Title,
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import { useGetQuizQuery, useGetStatisticQuery } from '../api/apiv2';
import ReviewDetails from '../ui-lib/widgets/ReviewDetails';
import StyledButton from '../ui-lib/StyledButton';
import ErrorParsing from '../ui-lib/widgets/ErrorParsing';
import { Statistic } from '../types/types';

const StyledButtonWrapper = styled(Div)`
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 12px;
`;

const QuizErrorsReview: React.FC = () => {
  const { id } = useParams();
  const { data } = useGetQuizQuery(id);
  const { data: stata } = useGetStatisticQuery(id);
  const [questions, setQuestions] = useState(data ? data.questions : []);
  const [statistics, setStatistics] = useState<Statistic[] | undefined>([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setQuestions(data ? data.questions : []);
  }, [data]);

  useEffect(() => {
    setStatistics(stata);
  }, [stata]);

  return (
    <Div style={{
      padding: 0,
      width: '100%',
      maxWidth: '914px',
    }}>
      <Title
        weight='2'
        style={{
          marginBottom: '24px',
        }}>
        {data?.name}
      </Title>
      <ReviewDetails
        data='14 июля 2023'
        questionsAmount={data?.questions.length || 0}
        rightQuestionsAmount={stata?.filter((el) => el.isRight === true).length || 0} />
      <ErrorParsing statistics={statistics} questions={questions} />
      <StyledButtonWrapper>
        <StyledButton onClick={() => navigate(`/quizzes/${id}`)}>Пройти снова</StyledButton>
        <StyledButton
          onClick={() => navigate('/quizzes')}
          style={{
            background: '#ffffff',
            border: '1px solid #2688eb',
            color: '#2688eb',
          }}>
          К списку квизов
        </StyledButton>
      </StyledButtonWrapper>
    </Div>
  );
};

export default QuizErrorsReview;
