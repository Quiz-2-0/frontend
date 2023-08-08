/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable camelcase */
import React, { FC } from 'react';
import styled from 'styled-components';
import QuizCard from './QuizCard';

import { AdminQuizz, TQuize } from '@/types/types';

const StyledQuizListContainer = styled.ul`
  margin: 0;
  padding: 0;
  width: 100%;
  list-style: none;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 42px;
`;

const QuizCardList: FC<{
  quizList: TQuize[] | undefined | AdminQuizz[],
  setIsConfirmationPopupOpen: any,
}> = ({ quizList, setIsConfirmationPopupOpen }) => {
  const localStorageRole = localStorage.getItem('role') || '';
  const sessionStorageRole = sessionStorage.getItem('role') || '';
  const userRole = (localStorageRole !== '') ? localStorageRole : sessionStorageRole;

  return (
    <StyledQuizListContainer>
      {quizList?.length === 0 || quizList === undefined
        ? (
          <>
            <div> </div>
            <p style={{ fontSize: '16px', color: '#818C99', paddingLeft: '15px' }}>Ничего не найдено</p>
          </>
        ) : quizList?.map((quiz: TQuize | AdminQuizz) => (
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
