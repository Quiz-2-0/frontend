/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Button, CustomSelect, Search } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import React, { FC } from 'react';
import styled from 'styled-components';
import StyledDiv from '../StyledDiv';
import StyledButton from '../StyledButton';

const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
`;

const StyledCustomSelect = styled(CustomSelect)`
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
}> = ({
  setSearch,
  search,
  type,
  setType,
  departments,
  setIsChooseQuizzesPopupOpen,
  setIsNewEmploeePopupOpen,
}) => {
  console.log(departments);
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
        <StyledCustomSelect
          selectType={type}
          value={type}
          options={departments}
          onChange={(e) => {
            console.log(e);
            setType(e.target.value);
          }} />
        <Buttons>
          <StyledButton
            mode='outline'
            style={{ margin: 0, width: '220px' }}
            onClick={() => setIsNewEmploeePopupOpen(true)}>
            Добавить сотрудника
          </StyledButton>
          <StyledButton
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