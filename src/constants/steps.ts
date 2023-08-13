import React from 'react';
import NewQuizStep1 from '@/ui-lib/widgets/NewQuizStep1';
import NewQuizStep2 from '@/ui-lib/widgets/NewQuizStep2';
import NewQuizStep3 from '@/ui-lib/widgets/NewQuizStep3';
import NewQuizStep4 from '@/ui-lib/widgets/NewQuizStep4';

export interface Step<T> {
  id: number;
  name: string;
  markup: {
    Component: React.ComponentType<T>;
  };
  button: {
    name: string;
    icon: string;
  };
}

export interface StepProps {
  items: number[];
  setItems: any;
  formElements: FormElements;
  setFormElements: SetFormElements;
}

export type FormElements = Record<
string, {
  id: number,
  text: string,
  isRight?: boolean,
}[] | { id: number, isValid: boolean }[]>;

export type SetFormElements = Record<string, any>;

const steps: Step<StepProps>[] = [
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
