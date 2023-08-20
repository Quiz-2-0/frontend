import React, { FC } from 'react';
import styled from 'styled-components';
import {
  Title,
  Text,
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import { useGetCurrentUserQuery } from '@/api/apiv2';
import LearningProgress from '@/ui-lib/widgets/LearningProgress';
import Castle from '@/ui-lib/widgets/Castle';
import Rating from '@/ui-lib/widgets/Rating';
import Achievements from '@/ui-lib/widgets/Achievements';
import IncompleteQuizzes from '@/ui-lib/widgets/IncompleteQuizzes';

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
  const { data: currentUser } = useGetCurrentUserQuery();

  return (
    <div
      style={{
        width: '100%',
        padding: '0',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        gap: '28px',
      }}>
      <div>
        <Title
          style={{
            margin: '0',
            padding: '0',
            fontSize: '24px',
            fontWeight: '500',
            lineHeight: '28px',
            letterSpacing: '0.326px',
          }}>
          {`${currentUser?.firstName}, привет!`}
        </Title>
        <Text
          style={{
            margin: '5px 0 0',
            padding: '0',
            fontSize: '15px',
            fontWeight: '400',
            lineHeight: '28px',
          }}>
          Сегодня отличное время, чтобы узнать новое или закрепить знания на практике.
        </Text>
      </div>
      <div
        style={{
          width: '100%',
          margin: '0',
          padding: '0',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          gap: '28px',
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
      <IncompleteQuizzes />
    </div>
  );
};

export default PersonalAccount;
