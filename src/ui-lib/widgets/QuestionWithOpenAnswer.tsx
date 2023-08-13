import React, { FC, useState } from 'react';
import { FormLayoutGroup } from '@vkontakte/vkui';
import StyledInput from '../styled-components/StyledInput';
import FormItemForNewQuiz from '../styled-components/FormItemForNewQuiz';

const QuestionWithOpenAnswer: FC = () => {
  const [answers, setAnswers] = useState<{
    id: number,
    text: string,
    isRight: boolean,
  }>({ id: 0, text: '', isRight: false });
  const [isAnswerValid, setIsAnswerValid] = useState<{
    isValid: boolean,
    id: number,
  }>({ isValid: true, id: 0 });
  const [help, setHelp] = useState<{
    id: number,
    text: string,
  }>({ id: 0, text: '' });
  const [isHelpValid, setIsHelpValid] = useState<{
    isValid: boolean,
    id: number,
  }>({ isValid: true, id: 0 });

  return (
    <FormLayoutGroup mode='horizontal' style={{ padding: 0, marginTop: '28px' }}>
      <FormItemForNewQuiz
        htmlFor='question-text'
        top='Текст ответа'
        onBlur={() => {
          setIsAnswerValid({ ...answers, isValid: answers.text !== '' });
        }}
        onChange={() => setIsAnswerValid({ ...answers, isValid: true })}
        status={isAnswerValid ? 'default' : 'error'}
        style={{ maxWidth: '546px' }}>
        <StyledInput
          style={{ minHeight: '40px' }}
          id='help'
          type='text'
          placeholder='Введите текст'
          name='question-text'
          value={answers.text}
          onChange={(e) => {
            setAnswers({ ...answers, text: e.target.value });
          }} />
      </FormItemForNewQuiz>
      <FormItemForNewQuiz
        htmlFor='question-text'
        top='Подсказка'
        onBlur={() => {
          setIsHelpValid({ ...help, isValid: help.text !== '' });
        }}
        onChange={() => setIsHelpValid({ ...help, isValid: true })}
        status={isHelpValid ? 'default' : 'error'}
        style={{ width: '100%' }}>
        <StyledInput
          style={{ minHeight: '40px' }}
          id='question-text'
          type='text'
          placeholder='Введите текст'
          name='question-text'
          value={help.text}
          onChange={(e) => {
            setHelp({ ...help, text: e.target.value });
          }} />
      </FormItemForNewQuiz>
    </FormLayoutGroup>
  );
};

export default QuestionWithOpenAnswer;
