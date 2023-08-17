/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import React from 'react';
import styled from 'styled-components';
import Dropdown from './Dropdown';
import { Statistic, Question } from '@/types/types';

const StyledUl = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ErrorParsing: React.FC<{
  statistics: {
    question_type: string,
    question: string,
    explanation: string,
    answer: string,
    user_answer: string,
    is_right: boolean,
    answers: {
      answer_text: string,
      answered: boolean,
      answer_right: boolean,
      is_right: boolean,
      answer_list: {
        text: string,
        answer_right: boolean,
      }[],
    }[],
  }[] | undefined,
  questions: Question[],
}> = ({ statistics, questions }) => (
  <StyledUl>
    {statistics === undefined || statistics.length === 0
      ? (
        <>
          <div> </div>
          <p style={{ fontSize: '16px', color: '#818C99', paddingLeft: '15px' }}>Ничего не найдено</p>
        </>
      ) : statistics.map((statistic, i) => (
        <Dropdown
          index={i + 1}
          name={statistic.question}
          description={statistic.explanation}
          answers={statistic.answers}
          isReview
          isRight={statistic.is_right}
          rightAnswer={statistic.answer}
          userAnswer={statistic.user_answer} />
      ))}
  </StyledUl>
);

export default ErrorParsing;
