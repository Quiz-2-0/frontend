/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { FC, useState } from 'react';
import AddAnswersOnPage from '@/ui-lib/widgets/AddAnswersOnPage';
import { QuestionTypeProps } from '@/constants/question-types';

const QuestionWithDragAndDrop: FC<QuestionTypeProps> = ({
  questionId,
}) => {
  const [answers, setAnswers] = useState<{
    id: number,
    text: string,
  }[]>([{ id: 0, text: '' }]);
  const [categories, setCategories] = useState<{
    id: number,
    text: string,
    items: { id: number, text: string }[],
  }[]>([{ id: 0, text: '', items: [] }]);
  const [isAnswerValid, setIsAnswerValid] = useState<{
    isValid: boolean,
    id: number,
  }[]>([{ isValid: true, id: 0 }]);
  const [isCategoryValid, setIsCategoryValid] = useState<{
    isValid: boolean,
    id: number,
  }[]>([{ isValid: true, id: 0 }]);

  return (
    <>
      <AddAnswersOnPage
        questionId={questionId}
        questionType='DAD'
        answers={answers}
        setAnswers={setAnswers}
        isAnswerValid={isAnswerValid}
        setIsAnswerValid={setIsAnswerValid}
        title='Категории для соотношений'
        description='Создайте 2 или 3 категории, с которыми будут соотноситься ответы'
        placeholder='Введите название категории' />
      <AddAnswersOnPage
        questionId={questionId}
        questionType='DAD'
        answers={categories}
        setAnswers={setCategories}
        isAnswerValid={isCategoryValid}
        setIsAnswerValid={setIsCategoryValid}
        title='Элементы для соотношения с категориями'
        description='Создайте элементы для соотношения с категориями'
        placeholder='Введите название элемента' />
      <AddAnswersOnPage
        questionId={questionId}
        questionType='DAD'
        answers={answers}
        categories={categories}
        title='Правильное соотношение'
        description='Создайте элементы для соотношения с категориями'
        placeholder='' />
    </>
  );
};

export default QuestionWithDragAndDrop;
