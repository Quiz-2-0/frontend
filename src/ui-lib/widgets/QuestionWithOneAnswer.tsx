/* eslint-disable ternary/no-unreachable */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { FC, useState, useEffect } from 'react';
import AddAnswersOnPage from '@/ui-lib/widgets/AddAnswersOnPage';
import { QuestionTypeProps } from '@/constants/question-types';

const QuestionWithOneAnswer: FC<QuestionTypeProps> = ({
  question,
  questionsList,
  setQuestionsList,
}) => {
  const [answers, setAnswers] = useState<{
    id: number,
    text: string,
    isRight: boolean,
  }[]>([{ id: 0, text: '', isRight: false }]);
  const [isAnswerValid, setIsAnswerValid] = useState<{
    isValid: boolean,
    id: number,
  }[]>([{ isValid: true, id: 0 }]);

  useEffect(() => {
    if (answers.length === 0) {
      setQuestionsList(questionsList.map((quest) => (
        quest.id === question.id ? { ...quest, answers: [{ id: 0, text: '' }] } : quest
      )));
      setIsAnswerValid([{ isValid: true, id: 0 }]);
    } else {
      setQuestionsList(questionsList.map((quest) => (
        quest.id === question.id ? { ...quest, answers } : quest
      )));
    }
  }, [answers]);

  return (
    <AddAnswersOnPage
      question={undefined}
      questionsList={undefined}
      setQuestionsList={undefined}
      questionType='ONE'
      answers={answers}
      setAnswers={setAnswers}
      isAnswerValid={isAnswerValid}
      setIsAnswerValid={setIsAnswerValid}
      title='Варианты ответов'
      description='Введите варианты ответов и отметьте правильные варианты'
      placeholder='Введите вариант' />
  );
};
export default QuestionWithOneAnswer;
