/* eslint-disable import/no-cycle */
import React from 'react';

const NewQuizStep1 = React.lazy(() => import('@/ui-lib/widgets/NewQuizStep1'));
const NewQuizStep2 = React.lazy(() => import('@/ui-lib/widgets/NewQuizStep2'));
const NewQuizStep3 = React.lazy(() => import('@/ui-lib/widgets/NewQuizStep3'));
const NewQuizStep4 = React.lazy(() => import('@/ui-lib/widgets/NewQuizStep4'));

type Step<T> = {
  id: number;
  name: string;
  markup: {
    Component: React.ComponentType<T>;
  };
  button: {
    name: string;
    icon: string;
  };
};

export type FormElements = {
  [key: string]: string[] | boolean[];
};

export type SetFormElements = {
  [key: string]: any;
};

const steps: Step<{
  items: number[],
  setItems: any,
  formElements: FormElements,
  setFormElements: SetFormElements,
}>[] = [
  {
    id: 0,
    name: 'Шаг 1. Общая информация о квизе',
    markup: { Component: NewQuizStep1 },
    button: {
      name: '',
      icon: '',
    },
  },
  {
    id: 1,
    name: 'Шаг 2. Вопросы и ответы',
    markup: { Component: NewQuizStep2 },
    button: {
      name: 'Добавить вопрос',
      icon: 'add',
    },
  },
  {
    id: 2,
    name: 'Шаг 3. Справочные материалы',
    markup: { Component: NewQuizStep3 },
    button: {
      name: 'Добавить тему',
      icon: 'add',
    },
  },
  {
    id: 3,
    name: 'Шаг 4. Публикация',
    markup: { Component: NewQuizStep4 },
    button: {
      name: 'Предпросмотр',
      icon: '',
    },
  },
];

export default steps;
