import { Icon24AddOutline } from '@vkontakte/icons';
import { Title } from '@vkontakte/vkui';
import React, { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import StyledButton from '../ui-lib/StyledButton';
import StyledDiv from '../ui-lib/StyledDiv';

const CreateNewQuiz: FC = () => {
  const navigate = useNavigate();
  return (
    <div>
      <StyledDiv
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '24px',
        }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '24px',
          }}>
          <Title size={24}>Создание квиза</Title>
          <StyledButton
            mode='outline'
            style={{ margin: 0 }}
            onClick={() => navigate('/new-quiz')}>
            Сохранить черновик
          </StyledButton>
        </div>
      </StyledDiv>
    </div>
  );
};

export default CreateNewQuiz;
