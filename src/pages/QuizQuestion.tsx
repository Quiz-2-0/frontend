import React from 'react';
import {
  Div,
  Title,
  Text,
  Button,
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

const QuizQuestion: React.FC = () => (
  <Div style={{ padding: 0 }}>
    <Title>Кто из перечисленных членов нашей команды является Back-end Developer?</Title>
  </Div>
);

export default QuizQuestion;
