/* eslint-disable no-nested-ternary */
import React, { FC } from 'react';
import styled from 'styled-components';
import QuizCard from './QuizCard';
import { useSelector } from '../../store/store.types';

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

const QuizCardList: FC = () => {
  const { quizzesOnPage } = useSelector((state) => state.all);
  const { isFiltered } = useSelector((state) => state.all);
  const { filteredQuizzes } = useSelector((state) => state.all);

  const quizCard = (quiz: Quiz, i: number) => (
    <QuizCard
      key={i}
      image={quiz.image}
      title={quiz.name}
      description={quiz.description}
      duration={quiz.duration}
      level={quiz.level}
      questionAmount={quiz.questionAmount}
      tags={quiz.tags} />
  );

  return (
    <StyledQuizListContainer>
      {isFiltered
        ? (filteredQuizzes.length !== 0
          ? filteredQuizzes.map((quiz: Quiz, i: number) => quizCard(quiz, i))
          : (
            <>
              <div> </div>
              <p style={{ textAlign: 'center', margin: '0' }}>Ничего не найдено</p>
            </>
          ))
        : (quizzesOnPage.map((quiz: Quiz, i: number) => quizCard(quiz, i)))}
    </StyledQuizListContainer>
  );
};

export default QuizCardList;
