/* eslint-disable ternary/no-unreachable */
/* eslint-disable no-else-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react';
import { AnswersList } from './SingleChoiceQuestion';
import MultipleChoiceAnswer from './MultipleChoiceAnswer';
import { MultipleChoiceQuestionProps } from '@/types/types';

const MultipleChoiceQuestion: React.FC<MultipleChoiceQuestionProps> = (
  { currentPage,
    questions,
    selectAnswers,
    selectedAnswers,
  },
) => {
  const handleCheckboxChange = (answerId: number) => {
    let answerIds = [];
    if (selectedAnswers.includes(answerId)) {
      answerIds = selectedAnswers.filter((answer) => answer !== answerId);
    } else {
      answerIds = [...selectedAnswers, answerId];
    }
    selectAnswers(answerIds);
  };

  return (
    <AnswersList>
      {
        questions[currentPage].answers.map((answer) => (
          <MultipleChoiceAnswer
            key={answer.id}
            question={answer}
            selectedAnswers={selectedAnswers}
            onCheckboxChange={handleCheckboxChange} />
        ))
      }
    </AnswersList>
  );
};

export default MultipleChoiceQuestion;
