import React, { FC } from 'react';
import styled from 'styled-components';
import DropdownLstAnswersItem from '@/ui-lib/widgets/DropdownLstAnswersItem';

const StyledLstBoards = styled.ul<{ isReview: boolean }>`
  max-width: 850px;
  list-style: none;
  padding: 0;
  margin: 28px 0 0 0;
  display: ${({ isReview }) => (isReview ? 'grid' : 'none')};
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  justify-items: start;
  align-items: start;
  justify-content: start;
  align-content: start;
`;

const DropdownLstAnswersList: FC<{
  isReview: boolean,
  answers: {
    answer_text: string,
    answer_list: {
      text: string,
      answer_right: boolean,
    }[],
  }[] | undefined,
}> = ({ isReview, answers }) => (
  <StyledLstBoards isReview={isReview}>
    {answers?.map((answer) => (
      <DropdownLstAnswersItem boardTitle={answer.answer_text} answerList={answer.answer_list} />
    ))}
  </StyledLstBoards>
);

export default DropdownLstAnswersList;
