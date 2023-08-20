/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { FC, useState, useEffect } from 'react';
import AddAnswersOnPage from '@/ui-lib/widgets/AddAnswersOnPage';
import { QuestionTypeProps } from '@/constants/question-types';

const QuestionWithDragAndDrop: FC<QuestionTypeProps> = ({
  question,
  questionsList,
  setQuestionsList,
}) => {
  const [answers, setAnswers] = useState<{
    id: number,
    text: string,
  }[]>([{ id: 0, text: '' }]);
  const [categories, setCategories] = useState<{
    id: number,
    text: string,
    answers: { id: number, text: string }[],
    answers_list: any,
  }[]>([{ id: 0, text: '', answers: [], answers_list: [] }]);
  const [isAnswerValid, setIsAnswerValid] = useState<{
    isValid: boolean,
    id: number,
  }[]>([{ isValid: true, id: 0 }]);
  const [isCategoryValid, setIsCategoryValid] = useState<{
    isValid: boolean,
    id: number,
  }[]>([{ isValid: true, id: 0 }]);

  useEffect(() => {
    if (categories.length === 0) {
      setCategories([{ id: 0, text: '', answers: [], answers_list: [] }]);
      setIsCategoryValid([{ isValid: true, id: 0 }]);
    }
    if (answers.length === 0) {
      setAnswers([{ id: 0, text: '' }]);
      setIsAnswerValid([{ isValid: true, id: 0 }]);
    }
  }, [categories, answers]);

  return (
    <>
      <AddAnswersOnPage
        question={undefined}
        questionsList={undefined}
        setQuestionsList={undefined}
        questionType='LST'
        answers={categories}
        setAnswers={setCategories}
        isAnswerValid={isCategoryValid}
        setIsAnswerValid={setIsCategoryValid}
        title='Категории для соотношений'
        description='Создайте 2 или 3 категории, с которыми будут соотноситься ответы'
        placeholder='Введите название категории' />
      <AddAnswersOnPage
        question={undefined}
        questionsList={undefined}
        setQuestionsList={undefined}
        questionType='LST'
        answers={answers}
        setAnswers={setAnswers}
        isAnswerValid={isAnswerValid}
        setIsAnswerValid={setIsAnswerValid}
        title='Элементы для соотношения с категориями'
        description='Создайте элементы для соотношения с категориями'
        placeholder='Введите название элемента' />
      <AddAnswersOnPage
        question={question}
        questionsList={questionsList}
        setQuestionsList={setQuestionsList}
        questionType='LST'
        answers={answers}
        categories={categories.map((category) => ({
          id: category.id,
          text: category.text,
          items: [],
        }))}
        title='Правильное соотношение'
        description='Создайте элементы для соотношения с категориями'
        placeholder='' />
    </>
  );
};

export default QuestionWithDragAndDrop;
