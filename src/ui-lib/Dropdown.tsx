/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable ternary/no-unreachable */
/* eslint-disable import/no-named-as-default */
/* eslint-disable no-nested-ternary */
/* eslint-disable ternary/nesting */
import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { ArrowIcon, CheckIcon, FalseIcon } from './icons';
import { IconWrapper } from './widgets/Achives';

const Li = styled.li<{ isReview: boolean }>`
  width: 100%;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #F2F3F5;
  position: relative;
  box-sizing: border-box;
  padding: ${({ isReview }) => (isReview ? '24px 0' : '24px 16px')}
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
  max-height: ${({ isOpen }) => (isOpen ? '190px' : '0')};
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
  margin: 0;
  margin-top: 14px;
`;

const Text = styled.p`
    margin: 0;
    min-height: 8px;
`;

const ModifiedIconWrapper = styled(IconWrapper) <{ isOpen: boolean }>`
     transform: ${({ isOpen }) => (isOpen ? 'rotate(270deg)' : 'rotate(90deg)')};
`;

const StyledAnswersList = styled.ul <{ isReview: boolean }>`
  display: ${({ isReview }) => (isReview ? 'flex' : 'none')};
  margin: 28px 0 20px;
  padding: 0;
  list-style: none;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
`;

const StyledAnswerItem = styled.li <{ isRight: 'red' | 'green' | 'transparent' }>`
  margin: 0;
  padding: 16px;
  border: ${({ isRight }) => (isRight === 'transparent' ? '1px solid #DCE1E6' : 'none')};
  border-radius: 4px;
  background-color: ${({ isRight }) => (isRight)};
`;

const Dropdown: FC<{
  index: number | null,
  name: string,
  description: string,
  answers: [] | { id: number, text: string, image: null | string, isAnswerRight: boolean }[],
  isReview: boolean,
  isRight?: boolean,
  rightAnswer?: string,
  userAnswer?: string, }> = (
  {
    index,
    name,
    description,
    answers,
    isReview,
    isRight,
    rightAnswer,
    userAnswer,
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
        <ModifiedIconWrapper isOpen={isOpen} onClick={() => open(!isOpen)}><ArrowIcon /></ModifiedIconWrapper>
      </HeaderBlock>
      <StyledExpandedItem isOpen={isOpen} isReview={isReview}>
        {answers === null
          ? null
          : (
            <StyledAnswersList isReview={isReview}>
              {answers.map((answer) => (
                <StyledAnswerItem isRight={rightAnswer === answer.text ? 'green' : (userAnswer === answer.text ? 'red' : 'transparent')}>
                  {answer.text}
                </StyledAnswerItem>
              ))}
            </StyledAnswersList>
          )}
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
  rightAnswer: '',
  userAnswer: '',
};

export default Dropdown;
