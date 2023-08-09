import React, { FC, useState } from 'react';
import AddAnswersOnPage from './AddAnswersOnPage';

const QuestionWithDragAndDrop: FC = () => {
  const [answers, setAnswers] = useState<string[]>([]);
  return (
    <>
      <AddAnswersOnPage
        title='Категории для соотношений'
        description='Создайте 2 или 3 категории, с которыми будут соотноситься ответы'
        placeholder='Введите название категории' />
      <AddAnswersOnPage
        title='Элементы для соотношения с категориями'
        description='Создайте элементы для соотношения с категориями'
        placeholder='Введите название элемента' />
      <AddAnswersOnPage
        title='Правильное соотношение'
        description='Создайте элементы для соотношения с категориями'
        placeholder='' />
    </>
  );
};

export default QuestionWithDragAndDrop;
