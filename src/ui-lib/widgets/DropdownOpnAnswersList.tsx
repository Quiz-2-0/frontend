import React, { FC } from 'react';
import { StyledInput } from '@/ui-lib/widgets/OpenEndedQuestion';

const DropdownOpnAnswersList: FC<{
  isReview: boolean,
  userAnswer: string | undefined,
  isRight: boolean | undefined,
}> = ({ isReview, userAnswer, isRight }) => (
  <StyledInput
    style={{
      margin: '28px 0 0 0',
      display: isReview ? 'block' : 'none',
      border: isRight ? '1px solid #43A843' : '1px solid #E64646',
    }}
    type='text'
    value={userAnswer} />
);

export default DropdownOpnAnswersList;
