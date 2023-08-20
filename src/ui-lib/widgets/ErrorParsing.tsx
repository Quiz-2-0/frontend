import React from 'react';
import styled from 'styled-components';
import Dropdown from './Dropdown';
import { Question } from '@/types/types';

const StyledUl = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
  list-style: none;
  padding: 0;
  margin: 0;
`;

interface IErrorParsingProps {
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
}

const ErrorParsing: React.FC<IErrorParsingProps> = ({ statistics, questions }) => (
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
          isReview
          isRight={statistic.is_right}
          questionType={statistic.question_type}
          answer={statistic.answer}
          userAnswer={statistic.user_answer}
          answers={statistic.answers} />
      ))}
  </StyledUl>
);

export default ErrorParsing;
