/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable ternary/no-unreachable */
import React, { FC } from 'react';
import styled from 'styled-components';
import '@vkontakte/vkui/dist/vkui.css';
import { IconButton } from '@vkontakte/vkui';
import { Icon24CancelOutline } from '@vkontakte/icons';
import Background from '../styled-components/Background';

const StyledDiv = styled.div`
  max-width: 832px;
  height: 712px;
  width: 100%;
  padding: 48px;
  box-sizing: border-box;
  background: white;
  border-radius: 16px;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.06),
    0 4px 8px 0 rgba(0, 0, 0, 0.04);
`;

const PreviewPopup: FC<{
  isPreviewPopupOpen: boolean,
  setIsPreviewPopupOpen: any,
}> = ({
  isPreviewPopupOpen,
  setIsPreviewPopupOpen,
}) => {
  const quiz = [];

  return (
    <Background
      style={{
        visibility: `${isPreviewPopupOpen ? 'visible' : 'hidden'}`,
        opacity: `${isPreviewPopupOpen ? '1' : '0'}`,
      }}>
      <StyledDiv>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
          }}>
          <IconButton
            aria-label='Закрыть'
            style={{ width: '28px', height: '28px' }}
            onClick={() => {
              setIsPreviewPopupOpen(false);
            }}>
            <Icon24CancelOutline fill='#3F8AE0' />
          </IconButton>
        </div>
      </StyledDiv>
    </Background>
  );
};

export default PreviewPopup;
