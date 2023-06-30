import React, { FC } from 'react';
import styled from 'styled-components';
import QuizCard from './QuizCard';
import { mockQuizes } from '../../constants/mock-data';

const StyledQuizListContainer = styled.ul`
  margin: 0;
  padding: 0 0 80px 0;
  max-width: 1074px;
  list-style: none;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 42px;
`;

interface Quiz {
  image: string,
  name: string;
  description: string;
  duration: number;
  level: string;
  questionAmount: number;
  tags: string[];
}

const QuizCardList: FC = () => (
  <StyledQuizListContainer>
    {mockQuizes.map((quiz: Quiz) => (
      <QuizCard
        image={quiz.image}
        title={quiz.name}
        description={quiz.description}
        duration={quiz.duration}
        level={quiz.level}
        questionAmount={quiz.questionAmount}
        tags={quiz.tags} />
    ))}
  </StyledQuizListContainer>
);

export default QuizCardList;
