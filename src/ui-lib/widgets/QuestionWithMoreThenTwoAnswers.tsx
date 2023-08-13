/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { FC, useState } from 'react';
import AddAnswersOnPage from '@/ui-lib/widgets/AddAnswersOnPage';
import { QuestionTypeProps } from '@/constants/question-types';

const QuestionWithMoreThenTwoAnswers: FC<QuestionTypeProps> = ({
  questionId,
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

  return (
    <AddAnswersOnPage
      questionId={questionId}
      questionType='MANY'
      answers={answers}
      setAnswers={setAnswers}
      isAnswerValid={isAnswerValid}
      setIsAnswerValid={setIsAnswerValid}
      title='Варианты ответов'
      description='Введите варианты ответов и отметьте правильные варианты'
      placeholder='Введите вариант' />
  );
};
export default QuestionWithMoreThenTwoAnswers;
