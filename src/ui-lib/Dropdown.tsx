/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable ternary/no-unreachable */
import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { ArrowIcon, CheckIcon } from './icons';
import { IconWrapper } from './widgets/Achives';

const Li = styled.li`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 24px 16px; 
    border-bottom: 1px solid #F2F3F5;
    position: relative;
    box-sizing: border-box;
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
  padding: ${({ isReview }) => (isReview ? '0 0 0 36px' : '0')};
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
`;

const Text = styled.p`
    margin: 0;
    min-height: 15px;
`;

const ModifiedIconWrapper = styled(IconWrapper) <{ isOpen: boolean }>`
     transform: ${({ isOpen }) => (isOpen ? 'rotate(270deg)' : 'rotate(90deg)')};
`;

const StyledAnswersList = styled.ul <{ isReview: boolean }>`
  display: ${({ isReview }) => (isReview ? 'flex' : 'none')};
  margin: 16px 0 20px;
  padding: 0;
  list-style: none;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
`;

const StyledAnswerItem = styled.li <{ isRight: boolean }>`
  margin: 0;
  padding: 16px;
  border: ${({ isRight }) => (isRight ? 'none' : '1px solid #DCE1E6')};
  border-radius: 4px;
  background-color: ${({ isRight }) => (isRight ? '#DEF0D3' : 'transparent')};
`;

const Dropdown: FC<{
  name: string,
  description: string,
  answers: [] | { id: number, text: string, image: null | string, isAnswerRight: boolean }[],
  isReview: boolean }> = (
  {
    name,
    description,
    answers,
    isReview,
  },
) => {
  const [isOpen, open] = useState(false);

  return (
    <Li>
      <HeaderBlock>
        {isReview ? <CheckIcon /> : null}
        <H4 isReview={isReview}>{name}</H4>
        <ModifiedIconWrapper isOpen={isOpen} onClick={() => open(!isOpen)}><ArrowIcon /></ModifiedIconWrapper>
      </HeaderBlock>
      <StyledExpandedItem isOpen={isOpen} isReview={isReview}>
        {answers === null
          ? null
          : (
            <StyledAnswersList isReview={isReview}>
              {answers.map((answer) => (
                <StyledAnswerItem isRight={answer.isAnswerRight}>
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

export default Dropdown;
