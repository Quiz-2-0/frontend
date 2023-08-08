/* eslint-disable ternary/no-unreachable */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import React from 'react';
import styled from 'styled-components';
import { SingleChoiceQuestionProps } from '@/types/types';

const Answers = styled.li<{ selectedAnswer: number, cardId: number }>`
  cursor: pointer;
  padding: 16px;
  list-style: none;
  max-width: 447px;
  width: 100%;
  min-height: min-content;
  height: 100%;
  box-sizing: border-box;
  border-radius: 4px;
  display: flex;
  text-align: center;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid ${({ selectedAnswer, cardId }) => (selectedAnswer === cardId ? '#3F8AE0' : '#DCE1E6')};
  background: ${({ selectedAnswer, cardId }) => (selectedAnswer === cardId ? 'rgba(63, 138, 224, 0.15)' : 'none')};

  &:hover {
    border: 1px solid ${({ selectedAnswer, cardId }) => (selectedAnswer === cardId ? '#3F8AE0' : 'rgba(63, 138, 224, 0.15)')};
    background: ${({ selectedAnswer, cardId }) => (selectedAnswer === cardId ? 'rgba(63, 138, 224, 0.2)' : 'rgba(63, 138, 224, 0.05)')};
  }
`;

export const AnswersList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  justify-items: start;
  align-items: start;
  justify-content: start;
  align-content: start;
  display: grid;
`;

const SingleChoiceQuestion: React.FC<SingleChoiceQuestionProps> = (
  {
    currentPage,
    questions,
    selectedAnswer,
    selectAnswer,
  },
) => (
  <AnswersList>
    {questions[currentPage].answers.map((el) => (
      <Answers
        key={el.id}
        selectedAnswer={selectedAnswer}
        cardId={el.id}
        onClick={() => selectAnswer(el.id)}>
        {el.text}
      </Answers>
    ))}
  </AnswersList>
);

export default SingleChoiceQuestion;
