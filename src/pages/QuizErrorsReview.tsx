/* eslint-disable ternary/no-unreachable */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import styled from 'styled-components';
import {
  Div,
  Title,
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import { useGetQuizQuery } from '../api/apiv2';
import Dropdown from '../ui-lib/Dropdown';
import ReviewDetails from '../ui-lib/widgets/ReviewDetails';
import StyledButton from '../ui-lib/StyledButton';

const StyledUl = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
  list-style: none;
  padding: 0;
  margin: 26px 0 0 0;
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
  const { data, error, isLoading } = useGetQuizQuery(id);
  const [questions, setQuestions] = useState(data ? data.questions : []);

  useEffect(() => {
    setQuestions(data ? data.questions : []);
  }, [data]);

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
        questionsAmount={questions.length}
        rightQuestionsAmount={3} />
      <StyledUl>
        {questions.map((question) => (
          <Dropdown
            name={question.text}
            description='Незаменимым бэкенд разработчиком является Илья Иванов. Мария Архипова и Георгий Трубачёв - незаменимые фронтендеры, а Надежда Лебедева - неповторимый дизайнер'
            answers={question.answers} />
        ))}
      </StyledUl>
      <StyledButtonWrapper>
        <StyledButton>Пройти снова</StyledButton>
        <StyledButton
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
