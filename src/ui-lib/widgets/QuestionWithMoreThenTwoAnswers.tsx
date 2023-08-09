import React, { FC, useState } from 'react';
import AddAnswersOnPage from './AddAnswersOnPage';

const QuestionWithMoreThenTwoAnswers: FC = () => {
  const [answers, setAnswers] = useState<string[]>([]);
  return (
    <AddAnswersOnPage
      title='Варианты ответов'
      description='Введите варианты ответов и отметьте правильные варианты'
      placeholder='Введите вариант' />
  );
};

export default QuestionWithMoreThenTwoAnswers;
