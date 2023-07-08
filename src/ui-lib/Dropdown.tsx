/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable ternary/no-unreachable */
import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { ArrowIcon } from './icons';
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

const H4 = styled.h4`
    flex: auto;
    color: #000;
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px;
    letter-spacing: 0.38px;
    margin: 0;
  
`;

const StyledExpandedItem = styled.div<{ isOpen: boolean }>`
  height: ${({ isOpen }) => (isOpen ? '150px' : '0')};
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

const StyledAnswersList = styled.ul`
  margin: 16px 0 20px;
  padding: 0;
  list-style: none;
  display: flex;
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

const Dropdown: FC<{ name: string, description: string, answers: [] | { id: number, text: string, image: null | string, isAnswerRight: boolean }[] }> = ({ name, description, answers }) => {
  const [isOpen, open] = useState(false);
  return (
    <Li>
      <HeaderBlock>
        <H4>{name}</H4>
        <ModifiedIconWrapper isOpen={isOpen} onClick={() => open(!isOpen)}><ArrowIcon /></ModifiedIconWrapper>
      </HeaderBlock>
      <StyledExpandedItem isOpen={isOpen}>
        {answers === null
          ? null
          : (
            <StyledAnswersList>
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
