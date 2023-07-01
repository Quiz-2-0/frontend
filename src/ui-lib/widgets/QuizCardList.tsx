/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable camelcase */
import React, { FC } from 'react';
import styled from 'styled-components';
import QuizCard from './QuizCard';

import { useGetAllQuizesQuery } from '../../api/apiv2';
import { TQuize } from '../../types/types';

const StyledQuizListContainer = styled.ul`
  margin: 0;
  padding: 0 0 80px 0;
  max-width: 1074px;
  list-style: none;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 42px;
`;

const QuizCardList: FC = () => {
  const { data, error, isLoading } = useGetAllQuizesQuery();
  return (
    <StyledQuizListContainer>
      {data?.map((quiz: TQuize) => (
        <QuizCard
          image={quiz.image}
          title={quiz.name}
          description={quiz.description}
          duration={quiz.duration}
          level={quiz.level}
          question_amount={quiz.question_amount}
          tags={quiz.tags} />
      ))}
    </StyledQuizListContainer>
  );
};

export default QuizCardList;
