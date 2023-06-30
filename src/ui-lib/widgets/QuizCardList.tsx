import React, { FC } from 'react';
import styled from 'styled-components';
import QuizCard from './QuizCard';

const StyledQuizListContainer = styled.ul`
  margin: 0;
  padding: 0 0 80px 0;
  max-width: 1074px;
  list-style: none;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 42px;
`;

const QuizCardList: FC = () => (
  <StyledQuizListContainer>
    <QuizCard />
    <QuizCard />
    <QuizCard />
    <QuizCard />
    <QuizCard />
    <QuizCard />
    <QuizCard />
    <QuizCard />
    <QuizCard />
  </StyledQuizListContainer>
);

export default QuizCardList;
