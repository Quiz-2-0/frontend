import React from 'react';
import styled from 'styled-components';
import {
  Input,
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

const StyledInput = styled(Input)`
  width: 400px;
  height: 40px;
`;

const OpenEndedQuestion = () => (
  <StyledInput type='text' placeholder='Введите ответ' />
);

export default OpenEndedQuestion;
