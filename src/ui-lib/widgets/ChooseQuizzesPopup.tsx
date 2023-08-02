/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable ternary/no-unreachable */
/* eslint-disable react/no-unused-prop-types */
import { FormItem, IconButton, Search } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import React, { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Icon24CancelOutline } from '@vkontakte/icons';
import { TableTitle, TableItem } from '../TableItems';
import StyledCheckbox from '../StyledCheckbox';
import StyledButton from '../StyledButton';
import Background from '../Background';

const StyledDiv = styled.div`
  max-width: 1080px;
  max-height: 688px;
  min-height: min-content;
  width: 100%;
  padding: 48px 60px;
  box-sizing: border-box;
  background: white;
  border-radius: 16px;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.06),
    0px 4px 8px 0px rgba(0, 0, 0, 0.04);
`;

const ChooseQuizzesPopup: FC<{
  setIsChooseQuizzesPopupOpen: any,
  setIsConfirmationPopupOpen: any,
  isChooseQuizzesPopupOpen: boolean
}> = ({ setIsChooseQuizzesPopupOpen, isChooseQuizzesPopupOpen, setIsConfirmationPopupOpen }) => {
  const dispatch = useDispatch();

  return (
    <Background
      style={{
        visibility: `${isChooseQuizzesPopupOpen ? 'visible' : 'hidden'}`,
        opacity: `${isChooseQuizzesPopupOpen ? '1' : '0'}`,
      }}>
      <StyledDiv>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
          }}>
          <IconButton
            style={{ width: '28px', height: '28px' }}
            onClick={() => setIsChooseQuizzesPopupOpen(false)}>
            <Icon24CancelOutline />
          </IconButton>
          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              margin: '40px 0 24px',
            }}>
            <h2
              style={{
                margin: 0,
                fontSize: '20px',
                fontWeight: '600',
                lineHeight: '24px',
                letterSpacing: '0.38px',
              }}>
              Выбор квиза
            </h2>
            <Search
              style={{
                maxWidth: '360px',
                width: '100%',
                margin: '0',
                padding: '0',
              }} />
          </div>
          <StyledDiv style={{ maxHeight: '396px', margin: 0, padding: '24px' }}>
            <FormItem style={{ padding: '0' }}>
              <StyledCheckbox style={{ marginBottom: '20px' }}>
                <TableTitle style={{ maxWidth: '336px' }}>Название</TableTitle>
                <TableTitle style={{ maxWidth: '180px' }}>Отдел</TableTitle>
                <TableTitle style={{ maxWidth: '152px' }}>Категория</TableTitle>
                <TableTitle style={{ maxWidth: '100px' }}>Уровень</TableTitle>
              </StyledCheckbox>
              <StyledCheckbox style={{ marginTop: '16px' }}>
                <TableItem style={{ maxWidth: '336px' }}>
                  Баланс работы и личной жизни
                </TableItem>
                <TableItem style={{ maxWidth: '180px' }}>
                  Для всех отделов
                </TableItem>
                <TableItem style={{ maxWidth: '152px' }}>
                  Коммуникация
                </TableItem>
                <TableItem style={{ maxWidth: '100px' }}>Сложный</TableItem>
              </StyledCheckbox>
              <StyledCheckbox style={{ marginTop: '16px' }}>
                <TableItem style={{ maxWidth: '336px' }}>
                  Баланс работы и личной жизни
                </TableItem>
                <TableItem style={{ maxWidth: '180px' }}>
                  Для всех отделов
                </TableItem>
                <TableItem style={{ maxWidth: '152px' }}>
                  Коммуникация
                </TableItem>
                <TableItem style={{ maxWidth: '100px' }}>Сложный</TableItem>
              </StyledCheckbox>
              <StyledCheckbox style={{ marginTop: '16px' }}>
                <TableItem style={{ maxWidth: '336px' }}>
                  Баланс работы и личной жизни
                </TableItem>
                <TableItem style={{ maxWidth: '180px' }}>
                  Для всех отделов
                </TableItem>
                <TableItem style={{ maxWidth: '152px' }}>
                  Коммуникация
                </TableItem>
                <TableItem style={{ maxWidth: '100px' }}>Сложный</TableItem>
              </StyledCheckbox>
              <StyledCheckbox style={{ marginTop: '16px' }}>
                <TableItem style={{ maxWidth: '336px' }}>
                  Баланс работы и личной жизни
                </TableItem>
                <TableItem style={{ maxWidth: '180px' }}>
                  Для всех отделов
                </TableItem>
                <TableItem style={{ maxWidth: '152px' }}>
                  Коммуникация
                </TableItem>
                <TableItem style={{ maxWidth: '100px' }}>Сложный</TableItem>
              </StyledCheckbox>
            </FormItem>
          </StyledDiv>
          <StyledButton
            style={{ minWidth: '167px', marginTop: '28px' }}
            onClick={() => {
              setIsConfirmationPopupOpen(true);
              setIsChooseQuizzesPopupOpen(false);
            }}>
            Назначить
          </StyledButton>
        </div>
      </StyledDiv>
    </Background>
  );
};

export default ChooseQuizzesPopup;
