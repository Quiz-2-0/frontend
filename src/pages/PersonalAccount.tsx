/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-fallthrough */
/* eslint-disable default-case */
import React, { FC, useEffect } from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import {
  Title,
  Text,
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import useQueryState from '@reduxjs/toolkit/query/react';
import LearningProgress from '../ui-lib/widgets/LearningProgress';
import Castle from '../ui-lib/widgets/Castle';
import Rating from '../ui-lib/widgets/Rating';
import Achievements from '../ui-lib/widgets/Achievements';
import { useSelector } from '../store/store.types';
import { useLoginMutation, jwt, userApi } from '../api/apiv2';

const StyledDiv = styled.div`
  display: flex;
  gap: 28px;
  flex-direction: column;
  max-height: 600px;
`;

const Div = styled.div`
   display: flex;
   gap: 28px;
`;

const PersonalAccount: FC = () => {
  const navigate = useNavigate();
  const { isLoaderRun } = useSelector((state) => state.all);
  return (
    <div
      style={{
        width: '100%',
        padding: '0',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
      }}>
      <div>
        <Title>Лев, привет!</Title>
        <Text>Сегодня отличное время, чтобы узнать новое или закрепить знания на практике.</Text>
      </div>
      <div
        style={{
          width: '100%',
          padding: '0',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
        }}>
        <StyledDiv>
          <LearningProgress />
          <Div>
            <Rating />
            <Achievements />
          </Div>
        </StyledDiv>
        <Castle />
      </div>
    </div>
  );
};

export default PersonalAccount;
