import React, { FC, useState } from 'react';
import { FormLayoutGroup } from '@vkontakte/vkui';
import AddAnswersOnPage from './AddAnswersOnPage';
import StyledInput from '../styled-components/StyledInput';
import FormItemForNewQuiz from '../styled-components/FormItemForNewQuiz';

const QuestionWithOpenAnswer: FC = () => {
  const [answer, setAnswer] = useState('');
  const [isAnswerValid, setIsAnswerValid] = useState(true);
  const [help, setHelp] = useState('');
  const [isHelpValid, setIsHelpValid] = useState(true);
  return (
    <FormLayoutGroup mode='horizontal' style={{ padding: 0, marginTop: '28px' }}>
      <FormItemForNewQuiz
        htmlFor='question-text'
        top='Текст ответа'
        onBlur={() => {
          setIsAnswerValid(answer !== '');
        }}
        onChange={() => setIsAnswerValid(true)}
        status={isAnswerValid ? 'default' : 'error'}
        style={{ maxWidth: '546px' }}>
        <StyledInput
          style={{ minHeight: '40px' }}
          id='help'
          type='text'
          placeholder='Введите текст'
          name='question-text'
          value={answer}
          onChange={(e) => {
            setAnswer(e.target.value);
          }} />
      </FormItemForNewQuiz>
      <FormItemForNewQuiz
        htmlFor='question-text'
        top='Подсказка'
        onBlur={() => {
          setIsHelpValid(help !== '');
        }}
        onChange={() => setIsAnswerValid(true)}
        status={isHelpValid ? 'default' : 'error'}
        style={{ width: '100%' }}>
        <StyledInput
          style={{ minHeight: '40px' }}
          id='question-text'
          type='text'
          placeholder='Введите текст'
          name='question-text'
          value={answer}
          onChange={(e) => {
            setHelp(e.target.value);
          }} />
      </FormItemForNewQuiz>
    </FormLayoutGroup>
  );
};

export default QuestionWithOpenAnswer;
