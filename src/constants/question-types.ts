import React from 'react';
import QuestionWithDragAndDrop from '@/ui-lib/widgets/QuestionWithDragAndDrop';
import QuestionWithMoreThenTwoAnswers from '@/ui-lib/widgets/QuestionWithMoreThenTwoAnswers';
import QuestionWithOneAnswer from '@/ui-lib/widgets/QuestionWithOneAnswer';
import QuestionWithOpenAnswer from '@/ui-lib/widgets/QuestionWithOpenAnswer';

export interface IQuestionType<T> {
  id: number;
  name: string;
  markup: {
    Component: React.ComponentType<T>;
  };
}

export interface QuestionTypeProps {
  questionId: number;
}

const questionTypes: IQuestionType<QuestionTypeProps>[] = [
  {
    id: 0,
    name: 'Вопрос с одним верным ответом',
    markup: { Component: QuestionWithOneAnswer },
  },
  {
    id: 1,
    name: 'Вопрос с двумя и более верными ответами',
    markup: { Component: QuestionWithMoreThenTwoAnswers },
  },
  {
    id: 2,
    name: 'Вопрос с открытым ответом',
    markup: { Component: QuestionWithOpenAnswer },
  },
  {
    id: 3,
    name: 'Вопрос на соотношение',
    markup: { Component: QuestionWithDragAndDrop },
  },
];

export default questionTypes;
