import React from 'react';

const NewQuizStep1 = React.lazy(() => import('../ui-lib/widgets/NewQuizStep1'));
const NewQuizStep2 = React.lazy(() => import('../ui-lib/widgets/NewQuizStep2'));
const NewQuizStep3 = React.lazy(() => import('../ui-lib/widgets/NewQuizStep3'));
const NewQuizStep4 = React.lazy(() => import('../ui-lib/widgets/NewQuizStep4'));

type Step = {
  id: number;
  name: string;
  markup: {
    Component: React.ComponentType;
  };
};

const steps: Step[] = [
  {
    id: 0,
    name: 'Шаг 1. Общая информация о квизе',
    markup: { Component: NewQuizStep1 },
  },
  {
    id: 1,
    name: 'Шаг 2. Вопросы и ответы',
    markup: { Component: NewQuizStep2 },
  },
  {
    id: 2,
    name: 'Шаг 3. Справочные материалы',
    markup: { Component: NewQuizStep3 },
  },
  {
    id: 3,
    name: 'Шаг 4. Публикация',
    markup: { Component: NewQuizStep4 },
  },
];

export default steps;
