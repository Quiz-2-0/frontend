/* eslint-disable react/no-array-index-key */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable no-plusplus */
/* eslint-disable ternary/no-unreachable */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react';
import { useNavigate } from 'react-router';
import {
  Title,
  Div,
  FormItem,
  Progress,
  Button,
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import styled from 'styled-components';
import StyledDiv from '../StyledDiv';
import levels from '../../constants/levels';
import { mockQuizes } from '../../constants/mock-data';

const StyledImage = styled.img`
  max-width: 310px;
  min-height: max-content;
  width: 100%;
  background: none;
  padding: 0;
  object-fit: cover;
`;

const Castle: React.FC = () => {
  const navigate = useNavigate();

  const doneQuizzes = mockQuizes.filter(({ passed }) => passed === true).length;
  const userLevel = levels.findIndex(({ numberOfQuizzes }) => (
    numberOfQuizzes > doneQuizzes
  )) - 1;
  const numberOfQuizzesToTheNextLevel = levels[userLevel + 1].numberOfQuizzes - doneQuizzes;
  const progressArr = [];

  for (let i = 0; i < levels[userLevel].level + 1; i++) {
    i < (levels[userLevel].level + 1 - numberOfQuizzesToTheNextLevel)
      ? progressArr.push(100) : progressArr.push(0);
  }

  return (
    <StyledDiv style={{
      maxWidth: '358px', width: '100%', height: 'max-content',
    }}>
      <Title
        style={{ textAlign: 'center', paddingBottom: '16px' }}
        level='2'>
        {levels[userLevel].title}
      </Title>
      <StyledImage
        src={levels[userLevel].image}
        style={{ }} />
      <FormItem
        style={{ padding: '24px 16px', textAlign: 'center' }}
        top={`квизов до следующего уровня: ${numberOfQuizzesToTheNextLevel} шт.`}>
        <Div
          style={{
            padding: '0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: '8px',
            gap: '1px',
          }}>
          {progressArr.map((progressValue: number, i: number) => (
            <Progress
              key={i}
              aria-labelledby='progresslabel'
              value={progressValue}
              style={{
                width: '100%',
                height: '100%',
                borderTopLeftRadius: `${i === 0 ? '8px' : '0'}`,
                borderBottomLeftRadius: `${i === 0 ? '8px' : '0'}`,
                borderTopRightRadius: `${i === progressArr.length - 1 ? '8px' : '0'}`,
                borderBottomRightRadius: `${i === progressArr.length - 1 ? '8px' : '0'}`,
              }} />
          ))}
        </Div>
      </FormItem>
      <Button
        style={{ maxWidth: '286px', margin: '0 auto', height: '40px' }}
        type='button'
        size='l'
        onClick={() => navigate('/quizzes')}
        stretched>
        Продолжить строить
      </Button>
    </StyledDiv>
  );
};

export default Castle;
