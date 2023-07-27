/* eslint-disable ternary/no-unreachable */
/* eslint-disable no-else-return */
import React, { useState } from 'react';
import { AnswersList } from './SingleChoiceQuestion';
import MultipleChoiceAnswer from './MultipleChoiceAnswer';

const questions = [
  {
    id: 1,
    text: 'Backend Developers',
  },
  {
    id: 2,
    text: 'QA',
  },
  {
    id: 3,
    text: 'Product Analytics',
  },
  {
    id: 4,
    text: 'Project Management',
  },
  {
    id: 5,
    text: 'UX исследователь',
  },
  {
    id: 6,
    text: 'Data science',
  },
];

const MultipleChoiceQuestion: React.FC = () => {
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);

  const handleCheckboxChange = (questionId: number, option: string) => {
    setSelectedAnswers((prevSelectedAnswers) => {
      if (prevSelectedAnswers.includes(option)) {
        // Если выбранный вариант уже есть в массиве выбранных ответов, удаляем его
        return prevSelectedAnswers.filter((answer) => answer !== option);
      } else {
        // Иначе добавляем выбранный вариант в массив выбранных ответов
        return [...prevSelectedAnswers, option];
      }
    });
  };

  return (
    <AnswersList>
      {
        questions.map((question) => (
          <MultipleChoiceAnswer
            key={question.id}
            question={question}
            selectedAnswers={selectedAnswers}
            onCheckboxChange={handleCheckboxChange} />
        ))
      }
    </AnswersList>
  );
};

export default MultipleChoiceQuestion;
