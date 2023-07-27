/* eslint-disable ternary/no-unreachable */
import React, { useState } from 'react';
import styled from 'styled-components';
import { AnswersList } from './SingleChoiceQuestion';
import checkboxIcon from '../../images/icons/checkbox_checked.svg';

const questions = [
  {
    id: 1,
    text: 'Backend Developers',
  },
  {
    id: 2,
    text: 'QA',
  },
  {
    id: 3,
    text: 'Product Analytics',
  },
  {
    id: 4,
    text: 'Project Management',
  },
  {
    id: 5,
    text: 'UX исследователь',
  },
  {
    id: 6,
    text: 'Data science',
  },
];

const MultipleChoiceAnswer = styled.li`
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
  gap: 16px;
  border: 1px solid #DCE1E6;
  position: relative;
`;

const Label = styled.label`
  font-size: 15px;
  line-height: 20px;
  font-weight: 400;
  color: #000000;
  cursor: pointer;
`;

const HiddenCheckboxInput = styled.input`
  opacity: 0;
  cursor: pointer;
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
  cursor: pointer;
  box-sizing: border-box;
  border: ${({ isChecked }) => (isChecked ? 'none' : '1px solid #DCE1E6')};
  background-color: ${({ isChecked }) => (isChecked ? '#3F8AE0' : 'transparent')};
  background-image: url(${checkboxIcon});
  background-position: center;
  background-repeat: no-repeat;
  background-size: 10px 7px;
`;

const MultipleChoiceQuestion: React.FC = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <AnswersList>
      <MultipleChoiceAnswer>
        <HiddenCheckboxInput
          id='1'
          type='checkbox'
          onChange={handleCheckboxChange} />
        <CheckboxSpan isChecked={isChecked} />
        <Label htmlFor='1'>Product Analytics</Label>
      </MultipleChoiceAnswer>
      <MultipleChoiceAnswer>
        <HiddenCheckboxInput
          id='2'
          type='checkbox'
          onChange={handleCheckboxChange} />
        <CheckboxSpan isChecked={isChecked} />
        <Label htmlFor='2'>Product Analytics</Label>
      </MultipleChoiceAnswer>
      <MultipleChoiceAnswer>
        <HiddenCheckboxInput
          id='3'
          type='checkbox'
          onChange={handleCheckboxChange} />
        <CheckboxSpan isChecked={isChecked} />
        <Label htmlFor='3'>UX исследователь</Label>
      </MultipleChoiceAnswer>
      <MultipleChoiceAnswer>
        <HiddenCheckboxInput
          id='4'
          type='checkbox'
          onChange={handleCheckboxChange} />
        <CheckboxSpan isChecked={isChecked} />
        <Label htmlFor='4'>QA</Label>
      </MultipleChoiceAnswer>
      <MultipleChoiceAnswer>
        <HiddenCheckboxInput
          id='5'
          type='checkbox'
          onChange={handleCheckboxChange} />
        <CheckboxSpan isChecked={isChecked} />
        <Label htmlFor='5'>Project Management</Label>
      </MultipleChoiceAnswer>
      <MultipleChoiceAnswer>
        <HiddenCheckboxInput
          id='6'
          type='checkbox'
          onChange={handleCheckboxChange} />
        <CheckboxSpan isChecked={isChecked} />
        <Label htmlFor='6'>Data science</Label>
      </MultipleChoiceAnswer>
    </AnswersList>
  );
};

export default MultipleChoiceQuestion;
