import React, { FC, useState } from 'react';
import styled from 'styled-components';
import DropdownOneAnswersList from '@/ui-lib/widgets/DropdownOneAnswersList';
import DropdownMnyAnswersList from '@/ui-lib/widgets/DropdownMnyAnswersList';
import DropdownOpnAnswersList from '@/ui-lib/widgets/DropdownOpnAnswersList';
import DropdownLstAnswersList from '@/ui-lib/widgets/DropdownLstAnswersList';
import { ArrowIcon, CheckIcon, FalseIcon } from '../styled-components/icons';
import { IconWrapper } from './Achives';

const Li = styled.li<{ isReview: boolean }>`
  width: 100%;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #F2F3F5;
  position: relative;
  box-sizing: border-box;
  padding: ${({ isReview }) => (isReview ? '24px 0' : '24px 16px')};
`;

const HeaderBlock = styled.div`
    display: flex;
    background-color: #FFF;
    align-items: center;
`;

const H4 = styled.h4<{ isReview: boolean }>`
  flex: auto;
  color: #000;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px;
  letter-spacing: 0.38px;
  margin: 0;
  padding: ${({ isReview }) => (isReview ? '0 0 0 8px' : '0')};
`;

const StyledExpandedItem = styled.div<{ isOpen: boolean, isReview: boolean }>`
  max-height: ${({ isOpen }) => (isOpen ? '350px' : '0')};
  padding: ${({ isReview }) => (isReview ? '0 0 0 28px' : '0')};
  overflow: auto;
  position: relative;
  transition: all ease .7s;
`;

const TextDiv = styled.div`
  width: 100%;
  color: #000;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  margin: 14px 0 0 0;
`;

const Text = styled.p`
  margin: 0;
  min-height: 8px;
`;

const Dropdown: FC<{
  index: number | null,
  name: string,
  description: string,
  isReview: boolean,
  isRight?: boolean,
  questionType?: string,
  answer?: string,
  userAnswer?: string,
  answers?: {
    answer_text: string,
    answered: boolean,
    answer_right: boolean,
    is_right: boolean;
    answer_list: {
      text: string,
      answer_right: boolean
    }[],
  }[],
}> = (
  {
    index,
    name,
    description,
    isReview,
    isRight,
    questionType,
    answer,
    userAnswer,
    answers,
  },
) => {
  const [isOpen, open] = useState(false);

  return (
    <Li isReview={isReview}>
      <HeaderBlock>
        {isReview && (isRight ? <CheckIcon /> : <FalseIcon />)}
        {index === null
          ? <H4 isReview={isReview}>{name}</H4>
          : <H4 isReview={isReview}>{`${index}. ${name}`}</H4>}
        <IconWrapper onClick={() => open(!isOpen)}>
          <ArrowIcon style={{ transform: `${isOpen ? 'rotate(270deg)' : 'rotate(90deg)'}`, transition: 'all .3s ease' }} />
        </IconWrapper>
      </HeaderBlock>
      <StyledExpandedItem isOpen={isOpen} isReview={isReview}>
        {(() => {
          switch (questionType) {
            case 'ONE':
              return (
                <DropdownOneAnswersList isReview={isReview} answers={answers} />
              );
            case 'MNY':
              return (
                <DropdownMnyAnswersList isReview={isReview} answers={answers} />
              );
            case 'OPN':
              return (
                <DropdownOpnAnswersList
                  isReview={isReview}
                  userAnswer={userAnswer}
                  isRight={isRight} />
              );
            case 'LST':
              return (
                <DropdownLstAnswersList isReview={isReview} answers={answers} />
              );
            default:
              return null;
          }
        })()}
        <TextDiv>
          {description.split('<br>').map((line) => (
            <Text>{line}</Text>
          ))}
        </TextDiv>
      </StyledExpandedItem>
    </Li>
  );
};

Dropdown.defaultProps = {
  isRight: false,
  questionType: undefined,
  answer: undefined,
  userAnswer: undefined,
  answers: undefined,
};

export default Dropdown;
