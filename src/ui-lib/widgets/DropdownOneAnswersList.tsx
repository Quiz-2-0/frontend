/* eslint-disable no-nested-ternary */
/* eslint-disable ternary/nesting */
import React, { FC } from 'react';
import styled from 'styled-components';

const StyledAnswersList = styled.ul<{ isReview: boolean }>`
  display: ${({ isReview }) => (isReview ? 'flex' : 'none')};
  margin: 28px 0 20px;
  padding: 0;
  list-style: none;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
`;

const StyledAnswerItem = styled.li <{ isRight: '#DEF0D3' | '#FFD6CC' | 'transparent' }>`
  margin: 0;
  padding: 16px;
  border: ${({ isRight }) => (isRight === 'transparent' ? '1px solid #DCE1E6' : 'none')};
  border-radius: 4px;
  background-color: ${({ isRight }) => (isRight)};
`;

const DropdownOneAnswersList: FC<{
  isReview: boolean,
  answers: {
    answer_text: string,
    answered: boolean,
    answer_right: boolean,
    is_right: boolean;
    answer_list: {
      text: string,
      answer_right: boolean
    }[],
  }[] | undefined,
}> = ({ isReview, answers }) => (
  <StyledAnswersList isReview={isReview}>
    {answers?.map((answer) => (
      <StyledAnswerItem
        isRight={answer.is_right ? '#DEF0D3' : (answer.answered ? '#FFD6CC' : 'transparent')}>
        {answer.answer_text}
      </StyledAnswerItem>
    ))}
  </StyledAnswersList>
);

export default DropdownOneAnswersList;
