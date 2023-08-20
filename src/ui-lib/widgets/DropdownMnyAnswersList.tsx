/* eslint-disable no-nested-ternary */
/* eslint-disable ternary/nesting */
import React, { FC } from 'react';
import styled from 'styled-components';
import {
  Label,
} from '@/ui-lib/widgets/MultipleChoiceAnswer';
import checkboxIcon from '@/assets/images/icons/checkbox_checked.svg';

const StyledMnyAnswersList = styled.ul<{ isReview: boolean }>`
  list-style: none;
  padding: 0;
  margin: 28px 0 0 0;
  display: ${({ isReview }) => (isReview ? 'grid' : 'none')};
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  justify-items: start;
  align-items: start;
  justify-content: start;
  align-content: start;
`;

const StyledMultipleChoiceAnswer = styled.li<{ isRight: boolean, isAnswered: boolean }>`
  padding: 16px 28px;
  list-style: none;
  width: 100%;
  min-height: min-content;
  height: 100%;
  box-sizing: border-box;
  border-radius: 4px;
  display: flex;
  text-align: center;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  border: ${({ isAnswered }) => (isAnswered ? 'none' : '1px solid #DCE1E6')};
  position: relative;
  background-color: ${({ isRight, isAnswered }) => (isRight ? '#DEF0D3' : (isAnswered ? '#FFD6CC' : 'transparent'))};
`;

const HiddenCheckboxInput = styled.input`
  opacity: 0;
  height: 16px;
  width: 16px;
`;

const CheckboxSpan = styled.span<{ isChecked: boolean }>`
  position: absolute;
  top: 50%;
  left: 28px;
  transform: translate(0, -50%);
  height: 16px;
  width: 16px;
  border-radius: 3px;
  box-sizing: border-box;
  border: ${({ isChecked }) => (isChecked ? 'none' : '1px solid #DCE1E6')};
  background-color: ${({ isChecked }) => (isChecked ? '#3F8AE0' : 'transparent')};
  background-image: ${({ isChecked }) => (isChecked ? `url(${checkboxIcon})` : 'none')};
  background-position: center;
  background-repeat: no-repeat;
  background-size: 10px 7px;
  opacity: .5;
`;

const DropdownMnyAnswersList: FC<{
  isReview: boolean,
  answers: {
    answer_text: string,
    answered: boolean,
    answer_right: boolean,
    is_right: boolean,
  }[] | undefined,
}> = ({ isReview, answers }) => (
  <StyledMnyAnswersList isReview={isReview}>
    {answers?.map((answer, i) => (
      <StyledMultipleChoiceAnswer isRight={answer.is_right} isAnswered={answer.answered}>
        <Label htmlFor={i.toString()}>
          <HiddenCheckboxInput
            id={i.toString()}
            type='checkbox'
            disabled
            value={answer.answer_text}
            checked={answer.answered} />
          <CheckboxSpan isChecked={answer.answered} />
          {answer.answer_text}
        </Label>
      </StyledMultipleChoiceAnswer>
    ))}
  </StyledMnyAnswersList>
);

export default DropdownMnyAnswersList;
