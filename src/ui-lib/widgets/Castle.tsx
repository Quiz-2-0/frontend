/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable react/no-array-index-key */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable no-plusplus */
/* eslint-disable ternary/no-unreachable */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useState } from 'react';
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
import StyledDiv from '../styled-components/StyledDiv';
import levels from '../../constants/levels';
import { setFromCastle, setLoaderState } from '../../store/allSlice/allSlice';
import { useGetAllQuizesQuery } from '../../api/apiv2';
import { useDispatch } from '../../store/store.types';

const StyledImage = styled.img`
  max-width: 310px;
  height: max-content;
  width: 100%;
  background: none;
  padding: 0;
  object-fit: cover;
`;

const StyledButton = styled(Button)`
  max-width: 286px;
  margin: 0 auto;
  height: 40px;
  border-radius: 4px;

  & > .vkuiButton__in > .vkuiButton__content {
    font-size: 15px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px;
    letter-spacing: -0.24px;
  }
`;

const Castle: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data, error, isLoading } = useGetAllQuizesQuery();

  const doneQuizzes = data?.filter(({ isPassed }) => isPassed === true).length;
  const userLevel = levels.findIndex(({ numberOfQuizzes }) => (
    numberOfQuizzes > doneQuizzes!
  )) - 1;
  const numberOfQuizzesToTheNextLevel = levels[Math.abs(userLevel) + 1].numberOfQuizzes - doneQuizzes!;
  const progressArr = [];

  for (let i = 0; i < levels[Math.abs(userLevel)].level + 1; i++) {
    i < (levels[Math.abs(userLevel)].level + 1 - numberOfQuizzesToTheNextLevel)
      ? progressArr.push(100) : progressArr.push(0);
  }

  const onButtonClick = () => {
    console.log(data?.find(({ appointed }) => appointed === true));
    dispatch(data?.find(({ appointed }) => appointed === true)
      ? setFromCastle(true)
      : setFromCastle(false));
    navigate('/quizzes');
  };

  return (
    <StyledDiv style={{
      maxWidth: '358px', width: '100%', height: '446px',
    }}>
      <Title
        style={{ textAlign: 'center', paddingBottom: '16px' }}
        level='2'>
        {levels[Math.abs(userLevel)].title}
      </Title>
      <StyledImage
        src={levels[Math.abs(userLevel)].image}
        style={{}} />
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
      <StyledButton
        type='button'
        size='l'
        onClick={onButtonClick}
        stretched>
        Продолжить строить
      </StyledButton>
    </StyledDiv>
  );
};

export default Castle;
