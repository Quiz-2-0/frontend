import React from 'react';
import styled from 'styled-components';
import {
  Div,
  Title,
  Subhead,
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import StyledDiv from '../StyledDiv';

const StyledDetailWrapper = styled(Div)`
  width: fit-content;
  padding: 24px 18px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;
`;

const ReviewDetails: React.FC<{
  data: string,
  questionsAmount: number,
  rightQuestionsAmount: number }> = ({ data, questionsAmount, rightQuestionsAmount }) => (
    <StyledDiv
      style={{
        width: 'fit-content',
        padding: '0',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '40px',
      }}>
      <StyledDetailWrapper>
        <Subhead>дата прохождения</Subhead>
        <Title weight='2'>{data}</Title>
      </StyledDetailWrapper>
      <StyledDetailWrapper>
        <Subhead>результат</Subhead>
        <Title weight='2'>{`${rightQuestionsAmount}/${questionsAmount} верных ответов`}</Title>
      </StyledDetailWrapper>
    </StyledDiv>
);

export default ReviewDetails;
