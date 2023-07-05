/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable ternary/no-unreachable */
import React, { FC, useState } from 'react';
import styled, { keyframes } from 'styled-components';
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

const TextDiv = styled.div<{ isOpen: boolean }>`
    width:100%;
    overflow: auto;
    position: relative;
    height: ${({ isOpen }) => (isOpen ? '150px' : '0')};
    color: #000;
    font-size: 15px;
    font-family: 'SFProDisplay';
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
    margin: 0;
    transition: all ease .7s; 
`;

const Text = styled.p`
    margin: 0;
    min-height: 15px;
`;

const ModifiedIconWrapper = styled(IconWrapper) <{ isOpen: boolean }>`
     transform: ${({ isOpen }) => (isOpen ? 'rotate(270deg)' : 'rotate(90deg)')};
    
`;

const Dropdown: FC<{ name: string, description: string }> = ({ name, description }) => {
  const [isOpen, open] = useState(false);
  return (
    <Li>
      <HeaderBlock>
        <H4>{name}</H4>
        <ModifiedIconWrapper isOpen={isOpen} onClick={() => open(!isOpen)}><ArrowIcon /></ModifiedIconWrapper>
      </HeaderBlock>
      <TextDiv isOpen={isOpen}>
        {description.split('<br>').map((line) => (
          <Text>{line}</Text>
        ))}
      </TextDiv>
    </Li>

  );
};

export default Dropdown;
