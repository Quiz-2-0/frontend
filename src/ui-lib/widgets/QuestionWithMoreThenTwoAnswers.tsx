/* eslint-disable @typescript-eslint/no-unsafe-call */
import React, { FC, useState, useEffect } from 'react';
import AddAnswersOnPage from '@/ui-lib/widgets/AddAnswersOnPage';
import { QuestionTypeProps } from '@/constants/question-types';

const QuestionWithMoreThenTwoAnswers: FC<QuestionTypeProps> = ({
  question,
  questionsList,
  setQuestionsList,
}) => {
  const [answers, setAnswers] = useState<{
    id: number,
    text: string,
    is_right: boolean,
    answers_list: any,
  }[]>([{ id: 0, text: '', is_right: false, answers_list: [] }]);
  const [isAnswerValid, setIsAnswerValid] = useState<{
    isValid: boolean,
    id: number,
  }[]>([{ isValid: true, id: 0 }]);

  useEffect(() => {
    if (answers.length === 0) {
      setQuestionsList(questionsList.map((quest) => (
        quest.id === question.id ? { ...quest, answers: [{ text: '', is_right: false, answers_list: [] }] } : quest
      )));
      setIsAnswerValid([{ isValid: true, id: 0 }]);
    } else {
      setQuestionsList(questionsList.map((quest) => (
        quest.id === question.id ? { ...quest,
          answers: answers.map((answer) => ({
            text: answer.text,
            is_right: answer.is_right,
            answers_list: [],
          })) } : quest
      )));
    }
  }, [answers]);

  return (
    <AddAnswersOnPage
      question={undefined}
      questionsList={undefined}
      setQuestionsList={undefined}
      questionType='MANY'
      answers={answers}
      setAnswers={setAnswers}
      isAnswerValid={isAnswerValid}
      setIsAnswerValid={setIsAnswerValid}
      title='Варианты ответов'
      description='Введите варианты ответов и отметьте правильные варианты'
      placeholder='Введите вариант' />
  );
};
export default QuestionWithMoreThenTwoAnswers;
