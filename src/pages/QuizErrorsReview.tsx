import React from 'react';
import styled from 'styled-components';
import {
  Div,
  Title,
  Subhead,
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import StyledDiv from '../ui-lib/StyledDiv';

const QuizErrorsReview: React.FC = () => (
  <Div style={{ padding: 0, width: '100%', maxWidth: '914px' }}>
    <Title
      weight='2'
      style={{
        marginBottom: '24px',
      }}>
      Квиз «Работа в команде»
    </Title>
    <StyledDiv
      style={{
        width: 'fit-content',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '40px',
      }}>
      <Div
        style={{
          width: 'fit-content',
          padding: '0',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'center',
          gap: '8px',
        }}>
        <Subhead>дата прохождения</Subhead>
        <Title weight='2'>05 июля 2023</Title>
      </Div>
      <Div
        style={{
          width: 'fit-content',
          padding: '0',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'center',
          gap: '8px',
        }}>
        <Subhead>результат</Subhead>
        <Title weight='2'>0/3 верных ответов</Title>
      </Div>
    </StyledDiv>
  </Div>
);

export default QuizErrorsReview;
