/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable ternary/no-unreachable */
import React, { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Button, FormItem, Search } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import { Icon28CheckCircleOutline } from '@vkontakte/icons';
import Background from '../Background';
import StyledButton from '../StyledButton';

const StyledDiv = styled.div`
  max-width: 500px;
  height: 252px;
  width: 100%;
  padding: 48px;
  box-sizing: border-box;
  background: white;
  border-radius: 16px;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.06),
    0px 4px 8px 0px rgba(0, 0, 0, 0.04);
`;

const ConfirmationPopup: FC<{
  isConfirmationPopupOpen: boolean,
  setIsConfirmationPopupOpen: any,
  setIsChooseQuizzesPopupOpen: any,
}> = ({ isConfirmationPopupOpen, setIsConfirmationPopupOpen, setIsChooseQuizzesPopupOpen }) => {
  const dispatch = useDispatch();

  return (
    <Background
      style={{
        visibility: `${isConfirmationPopupOpen ? 'visible' : 'hidden'}`,
        opacity: `${isConfirmationPopupOpen ? '1' : '0'}`,
      }}>
      <StyledDiv>
        <h2
          style={{
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            gap: '12px',
            margin: '0 0 16px',
            fontSize: '20px',
            fontWeight: 600,
            lineHeight: '24px',
            letterSpacing: '0.38px',
          }}>
          <Icon28CheckCircleOutline fill='#43A843' />
          Квизы назначены
        </h2>
        <p
          style={{
            margin: 0,
            fontSize: '15px',
            fontWeight: '400',
            lineHeight: '20px',
          }}>
          Проверить назначение квизов можно в разделе «Назначенные квизы»
        </p>
        <div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '16px',
            marginTop: '32px',
          }}>
          <StyledButton
            style={{ margin: 0, width: '100%' }}
            onClick={() => {
              setIsConfirmationPopupOpen(false);
            }}>
            Вернуться к списку
          </StyledButton>
          <StyledButton
            style={{ margin: 0, width: '100%' }}
            onClick={() => setIsConfirmationPopupOpen(false)}
            mode='outline'>
            Проверить
          </StyledButton>
        </div>
      </StyledDiv>
    </Background>
  );
};

export default ConfirmationPopup;
