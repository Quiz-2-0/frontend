/* eslint-disable @typescript-eslint/no-unsafe-call */
import React, { FC, useState } from 'react';
import { FormLayoutGroup } from '@vkontakte/vkui';
import StyledInput from '../styled-components/StyledInput';
import FormItemForNewQuiz from '../styled-components/FormItemForNewQuiz';
import { QuestionTypeProps } from '@/constants/question-types';

const QuestionWithOpenAnswer: FC<QuestionTypeProps> = ({
  question,
  questionsList,
  setQuestionsList,
}) => {
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
          setIsAnswerValid({ ...isAnswerValid, isValid: question.answers?.[0]?.text !== '' ?? false });
        }}
        onChange={() => setIsAnswerValid({ ...isAnswerValid, isValid: true })}
        status={isAnswerValid ? 'default' : 'error'}
        style={{ maxWidth: '546px' }}>
        <StyledInput
          style={{ minHeight: '40px' }}
          id='help'
          type='text'
          placeholder='Введите текст'
          name='question-text'
          value={question.answers?.[0]?.text}
          onChange={(e) => {
            setQuestionsList(questionsList.map((quest) => (
              quest.id === question.id
                ? { ...quest, answers: [{ id: 0, text: e.target.value }] }
                : quest
            )));
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
