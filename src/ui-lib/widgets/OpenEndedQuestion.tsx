/* eslint-disable @typescript-eslint/no-unsafe-call */
import React, { ChangeEvent } from 'react';
import styled from 'styled-components';
import { Input } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import { OpenEndedQuestionProps } from '@/types/types';

export const StyledInput = styled(Input)`
  width: 400px;
  height: 40px;
`;

const OpenEndedQuestion: React.FC<OpenEndedQuestionProps> = ({ selectAnswerText }) => {
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    selectAnswerText(value);
  };

  return (
    <StyledInput
      onChange={onChange}
      type='text'
      placeholder='Введите ответ' />
  );
};

export default OpenEndedQuestion;
