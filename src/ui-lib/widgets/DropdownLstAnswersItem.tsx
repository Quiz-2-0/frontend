import React, { FC } from 'react';
import styled from 'styled-components';

const StyledLstBoard = styled.li`
  padding: 8px 30px 14px;
  margin: 0;
  width: 100%;
  height: fit-content;
  background-color: #F5F9FD;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 16px;
  box-sizing: border-box;
`;

const StyledLstBoardTitle = styled.h3`
  padding: 0;
  margin: 0;
  color: #000000;
  text-align: center;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: -0.32px;
`;

const StyledLstCardsContainer = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;
`;

const StyledLstCardItem = styled.li<{ isRight: boolean }>`
  padding: 0;
  margin: 0;
  list-style: none;
  width: 202px;
  height: 52px;
  border-radius: 4px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: ${({ isRight }) => (isRight ? '#DEF0D3' : '#FFD6CC')};
  color: #000000;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
`;

const DropdownLstAnswersItem: FC<{
  boardTitle: string,
  answerList: {
    text: string,
    answer_right: boolean,
  }[],
}> = ({ boardTitle, answerList }) => (
  <StyledLstBoard>
    <StyledLstBoardTitle>
      {boardTitle}
    </StyledLstBoardTitle>
    <StyledLstCardsContainer>
      {answerList.map((item) => (
        <StyledLstCardItem isRight={item.answer_right}>
          {item.text}
        </StyledLstCardItem>
      ))}
    </StyledLstCardsContainer>
  </StyledLstBoard>
);

export default DropdownLstAnswersItem;
