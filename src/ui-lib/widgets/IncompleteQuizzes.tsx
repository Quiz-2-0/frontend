import React from 'react';
import styled from 'styled-components';
import {
  Title,
  Headline,
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import StyledDiv from '../StyledDiv';
import QuizCardList from './QuizCardList';
import QuizCard from './QuizCard';

const IncompleteQuizzes: React.FC = () => (
  <StyledDiv
    style={{
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      gap: '24px',
    }}>
    <Title
      style={{ textAlign: 'left' }}
      level='2'>
      Незавершённые квизы
    </Title>
    <div
      style={{
        width: '100%',
        minHeight: '150px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: '10px',
      }}>
      <Headline>У вас нет незавершённых квизов.</Headline>
      <Headline>Перейдите в раздел «Квизы», чтобы продолжить обучение.</Headline>
    </div>
  </StyledDiv>
);

export default IncompleteQuizzes;
