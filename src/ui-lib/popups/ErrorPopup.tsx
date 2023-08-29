/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import React, { FC } from 'react';
import styled from 'styled-components';
import '@vkontakte/vkui/dist/vkui.css';
import { Icon28ErrorOutline } from '@vkontakte/icons';
import Background from '../styled-components/Background';
import StyledButton from '../styled-components/StyledButton';

const StyledDiv = styled.div`
  max-width: 500px;
  height: min-content;
  width: 100%;
  padding: 48px;
  box-sizing: border-box;
  background: white;
  border-radius: 16px;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.06),
    0 4px 8px 0 rgba(0, 0, 0, 0.04);
`;

const ErrorPopup: FC<{
  isErrorPopupOpen: boolean,
  setIsErrorPopupOpen: any,
  title: string,
  description: string,
  button: string,
}> = ({
  isErrorPopupOpen,
  setIsErrorPopupOpen,
  title,
  description,
  button,
}) => (
  <Background
    style={{
      visibility: `${isErrorPopupOpen ? 'visible' : 'hidden'}`,
      opacity: `${isErrorPopupOpen ? '1' : '0'}`,
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
        <Icon28ErrorOutline fill='#E64646' />
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
      <StyledButton
        style={{ marginTop: '32px', maxWidth: '167px' }}
        onClick={() => setIsErrorPopupOpen(false)}>
        {button}
      </StyledButton>
    </StyledDiv>
  </Background>
);

export default ErrorPopup;
