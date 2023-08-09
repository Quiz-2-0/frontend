import React from 'react';

const QuestionWithOneAnswer = React.lazy(() => import('@/ui-lib/widgets/QuestionWithOneAnswer'));
const QuestionWithMoreThenTwoAnswers = React.lazy(() => import('@/ui-lib/widgets/QuestionWithMoreThenTwoAnswers'));
const QuestionWithOpenAnswer = React.lazy(() => import('@/ui-lib/widgets/QuestionWithOpenAnswer'));
const QuestionWithDragAndDrop = React.lazy(() => import('@/ui-lib/widgets/QuestionWithDragAndDrop'));

interface IQuestionType {
  id: number;
  name: string;
  markup: {
    Component: React.ComponentType;
  };
}

const questionTypes: IQuestionType[] = [
  {
    id: 0,
    name: 'Вопрос с одним верным ответом',
    markup: { Component: QuestionWithOneAnswer },
  },
  {
    id: 0,
    name: 'Вопрос с двумя и более верными ответами',
    markup: { Component: QuestionWithMoreThenTwoAnswers },
  },
  {
    id: 0,
    name: 'Вопрос с открытым ответом',
    markup: { Component: QuestionWithOpenAnswer },
  },
  {
    id: 0,
    name: 'Вопрос на соотношение',
    markup: { Component: QuestionWithDragAndDrop },
  },
];

export default questionTypes;
