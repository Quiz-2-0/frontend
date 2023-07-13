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
import Dropdown from '../ui-lib/Dropdown';
import ReviewDetails from '../ui-lib/widgets/ReviewDetails';
import StyledButton from '../ui-lib/StyledButton';
import { setLoaderState } from '../store/allSlice/allSlice';

type Statistic = {
  explanation: string;
  isRight: boolean;
  question: string;
  right_answer: string;
  user_answer: string;
};

const StyledUl = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
  list-style: none;
  padding: 0;
  margin: 20px 0 0 0;
`;

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
  const { data, error } = useGetQuizQuery(id);
  const { data: stata, isLoading } = useGetStatisticQuery(id);
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
    <Div style={{ padding: 0, width: '100%', maxWidth: '914px' }}>
      <Title
        weight='2'
        style={{
          marginBottom: '24px',
        }}>
        {data?.name}
      </Title>
      <ReviewDetails
        data='05 июля 2023'
        questionsAmount={data?.questions.length || 0}
        rightQuestionsAmount={stata?.filter((el) => el.isRight === true).length || 0} />
      <StyledUl>
        {
          statistics !== undefined && !isLoading
            ? questions.map((question, i) => (
              <Dropdown
                index={i + 1}
                name={question.text}
                description={statistics[i]?.explanation}
                answers={question.answers}
                isReview
                isRight={statistics[i]?.isRight}
                rightAnswer={statistics[i]?.right_answer}
                userAnswer={statistics[i]?.user_answer} />
            ))
            : null
        }
      </StyledUl>
      <StyledButtonWrapper>
        <StyledButton onClick={() => { dispatch(setLoaderState(true)); navigate(`/quizzes/${id}`); }}>Пройти снова</StyledButton>
        <StyledButton
          onClick={() => { dispatch(setLoaderState(true)); navigate('/quizzes'); }}
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
