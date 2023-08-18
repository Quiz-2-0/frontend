import React from 'react';
import QuestionWithDragAndDrop from '@/ui-lib/widgets/QuestionWithDragAndDrop';
import QuestionWithMoreThenTwoAnswers from '@/ui-lib/widgets/QuestionWithMoreThenTwoAnswers';
import QuestionWithOneAnswer from '@/ui-lib/widgets/QuestionWithOneAnswer';
import QuestionWithOpenAnswer from '@/ui-lib/widgets/QuestionWithOpenAnswer';
import { IQuestionAdmin } from '@/types/types';

export interface IQuestionType<T> {
  id: number;
  shortname: string;
  hiddeninfo: string;
  name: string;
  markup: {
    Component: React.ComponentType<T>;
  };
}

export interface QuestionTypeProps {
  question: IQuestionAdmin;
  questionsList: IQuestionAdmin[];
  setQuestionsList: any;
}

const questionTypes: IQuestionType<QuestionTypeProps>[] = [
  {
    id: 0,
    shortname: 'ONE',
    hiddeninfo: 'Введите несколько ответов, выберите среди них один верный вариант',
    name: 'Вопрос с одним верным ответом',
    markup: { Component: QuestionWithOneAnswer },
  },
  {
    id: 1,
    shortname: 'MNY',
    hiddeninfo: 'Введите несколько ответов, выберите среди них несколько верных вариантов',
    name: 'Вопрос с двумя и более верными ответами',
    markup: { Component: QuestionWithMoreThenTwoAnswers },
  },
  {
    id: 2,
    shortname: 'OPN',
    hiddeninfo: 'Введите верный ответ на вопрос и добавьте подсказку о том, как должен выглядеть ответ',
    name: 'Вопрос с открытым ответом',
    markup: { Component: QuestionWithOpenAnswer },
  },
  {
    id: 3,
    shortname: 'LST',
    hiddeninfo: 'Введите 2 или более категории и 2 и более ответа, после чего распределите ответы по категориям',
    name: 'Вопрос на соотношение',
    markup: { Component: QuestionWithDragAndDrop },
  },
];

export default questionTypes;
