/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Button, Select, Search } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import React, { FC } from 'react';
import styled from 'styled-components';
import StyledDiv from '../styled-components/StyledDiv';
import StyledButton from '../styled-components/StyledButton';

const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
`;

const StyledSelect = styled(Select)`
  width: 100%;

  & > .vkuiSelect {
    min-height: 40px;
  }
`;

const StaffFilter: FC<{
  search: string,
  setSearch: any,
  type: any,
  setType: any,
  departments: { label: string, value: string }[],
  setIsChooseQuizzesPopupOpen: any,
  setIsNewEmploeePopupOpen: any,
  isChecked: number[],
}> = ({
  setSearch,
  search,
  type,
  setType,
  departments,
  setIsChooseQuizzesPopupOpen,
  setIsNewEmploeePopupOpen,
  isChecked,
}) => {
  const onChange = (e: { target: { value: any; }; }) => {
    setSearch(e.target.value);
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
      <StyledDiv
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '40px',
        }}>
        <StyledSelect
          value={type}
          onChange={(e) => setType(e.target.value)}
          options={departments} />
        <Buttons>
          <StyledButton
            mode='outline'
            style={{ margin: 0, width: '220px' }}
            onClick={() => setIsNewEmploeePopupOpen(true)}>
            Добавить сотрудника
          </StyledButton>
          <StyledButton
            disabled={isChecked.length === 0}
            style={{ margin: 0, width: '220px' }}
            onClick={() => setIsChooseQuizzesPopupOpen(true)}>
            Назначить квиз
          </StyledButton>
        </Buttons>
      </StyledDiv>
      <Search
        style={{
          maxWidth: '361px',
          width: '100%',
          margin: '24px 0 12px',
          padding: '0',
        }}
        placeholder='Поиск по сотрудникам'
        value={search}
        onChange={(e) => setSearch(e.target.value)} />
    </div>
  );
};

export default StaffFilter;
