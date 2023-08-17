/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable camelcase */
import React, { FC } from 'react';
import styled from 'styled-components';
import QuizCard from './QuizCard';

import { AdminQuizz, IQuiz } from '@/types/types';

const StyledQuizListContainer = styled.ul<{ isCompleted: boolean }>`
  margin: 0;
  padding: 0;
  width: 100%;
  list-style: none;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-items: start;
  align-items: start;
  justify-content: space-between;
  align-content: start;
  gap: ${({ isCompleted }) => (isCompleted ? '18px 24px' : '42px')};;
`;

const QuizCardList: FC<{
  quizList: IQuiz[] | undefined | AdminQuizz[],
  setIsConfirmationPopupOpen: any,
  isCompleted: boolean,
}> = ({ quizList, setIsConfirmationPopupOpen, isCompleted }) => {
  const localStorageRole = localStorage.getItem('role') || '';
  const sessionStorageRole = sessionStorage.getItem('role') || '';
  const userRole = (localStorageRole !== '') ? localStorageRole : sessionStorageRole;

  return (
    <StyledQuizListContainer isCompleted={isCompleted}>
      {quizList?.length === 0 || quizList === undefined
        ? (
          <>
            <div> </div>
            <p style={{ fontSize: '16px', color: '#818C99', paddingLeft: '15px' }}>Ничего не найдено</p>
          </>
        ) : quizList?.map((quiz: IQuiz | AdminQuizz) => (
          <QuizCard
            setIsConfirmationPopupOpen={setIsConfirmationPopupOpen}
            id={quiz.id}
            key={quiz.id}
            image={quiz.image}
            title={quiz.name}
            description={quiz.description}
            duration={quiz.duration}
            level={quiz.level}
            isPassed={'isPassed' in quiz ? quiz.isPassed : ''}
            question_amount={quiz.question_amount}
            tags={quiz.tags} />
        ))}
    </StyledQuizListContainer>
  );
};

export default QuizCardList;
