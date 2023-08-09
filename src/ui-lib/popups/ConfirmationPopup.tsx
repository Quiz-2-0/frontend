/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable ternary/no-unreachable */
import React, { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import { Button, FormItem, Search } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import { Icon28CheckCircleOutline, Icon28DeleteOutline } from '@vkontakte/icons';
import Background from '../styled-components/Background';
import StyledButton from '../styled-components/StyledButton';

const StyledDiv = styled.div`
  max-width: 500px;
  height: 252px;
  width: 100%;
  padding: 48px;
  box-sizing: border-box;
  background: white;
  border-radius: 16px;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.06),
    0 4px 8px 0 rgba(0, 0, 0, 0.04);
`;

const ConfirmationPopup: FC<{
  isConfirmationPopupOpen: boolean,
  setIsConfirmationPopupOpen: any,
  title: string,
  icon: string,
  description: string,
  blueButton: string,
  whiteButton: string,
  blueButtonLink: string,
  whiteButtonLink: string,
}> = ({
  isConfirmationPopupOpen,
  setIsConfirmationPopupOpen,
  title,
  icon,
  description,
  blueButton,
  whiteButton,
  blueButtonLink,
  whiteButtonLink,
}) => {
  const navigate = useNavigate();

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
          {icon === 'check' ? <Icon28CheckCircleOutline fill='#43A843' /> : <Icon28DeleteOutline fill='#99A2AD' />}
          {title}
        </h2>
        <p
          style={{
            margin: 0,
            fontSize: '15px',
            fontWeight: '400',
            lineHeight: '20px',
          }}>
          {description}
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
              blueButtonLink !== '' && navigate(blueButtonLink);
            }}>
            {blueButton}
          </StyledButton>
          <StyledButton
            style={{ margin: 0, width: '100%' }}
            onClick={() => {
              setIsConfirmationPopupOpen(false);
              whiteButtonLink !== '' && navigate(whiteButtonLink);
            }}
            mode='outline'>
            {whiteButton}
          </StyledButton>
        </div>
      </StyledDiv>
    </Background>
  );
};

export default ConfirmationPopup;
