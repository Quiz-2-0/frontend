import React from 'react';

const QuestionWithOneAnswer = React.lazy(() => import('@/ui-lib/widgets/QuestionWithOneAnswer'));
const QuestionWithMoreThenTwoAnswers = React.lazy(() => import('@/ui-lib/widgets/QuestionWithMoreThenTwoAnswers'));
const QestionWithOpenAnswer = React.lazy(() => import('@/ui-lib/widgets/QestionWithOpenAnswer'));
const QuestionWithDragAndDrop = React.lazy(() => import('@/ui-lib/widgets/QuestionWithDragAndDrop'));

type QuestionType = {
  id: number;
  name: string;
  markup: {
    Component: React.ComponentType;
  };
};

const questionTypes: QuestionType[] = [
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
    markup: { Component: QestionWithOpenAnswer },
  },
  {
    id: 0,
    name: 'Вопрос на соотношение',
    markup: { Component: QuestionWithDragAndDrop },
  },
];

export default questionTypes;
