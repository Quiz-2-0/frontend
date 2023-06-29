/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useState } from 'react';
import {
  Tabs,
  TabsItem,
  Search,
  Badge,
  Div,
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import styled from 'styled-components';
import { mockQuizes } from '../../constants/mock-data';

const StyledDiv = styled(Div)`
  padding: 0 0 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledTabs = styled(Tabs)`
  max-width: 429px;
  width: 100%;
  heigth: 48px;

  & > div {
    display: flex;
    gap: 16px;
  }

  & > div > .vkuiTabsItem--selected {
    background-color: rgba(63, 138, 224, 0.05);
    color: #000;
  }

  & > div > .vkuiTabsItem--selected:hover {
    background: rgba(63, 138, 224, 0.15);
  }
`;

const StyledTabsItem = styled(TabsItem)`
  padding: 0 16px;
  box-sizing: border-box;
  max-width: max-content;
  min-width: 125px;
  heigth: 100%;

  &:hover {
    background: rgba(63, 138, 224, 0.15);
  }

  & > div {
    display: none;
  }

  & > span {
    color: #818C99;
    text-align: center;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px;
    letter-spacing: -0.32px;
  }
`;

const QuizMenu: React.FC = () => {
  const [search, setSearch] = useState('');
  const [quizType, setQuizType] = useState('all');

  const onChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setSearch(e.target.value);
  };

  const quizNameFilter = mockQuizes.filter(
    ({ name }) => name.toLowerCase().indexOf(search.toLowerCase()) > -1,
  );
  console.log('Результаты поиска:', quizNameFilter);

  const quizTypeFilter = (type: string) => {
    type !== 'all'
      ? console.log('Фильтр:', mockQuizes.filter(({ directory }) => directory === type))
      : console.log('Все квизы:', mockQuizes);
    setQuizType(type);
  };

  return (
    <StyledDiv>
      <StyledTabs>
        <StyledTabsItem selected={quizType === 'all'} onClick={() => quizTypeFilter('all')}>
          Все квизы
        </StyledTabsItem>
        <StyledTabsItem
          selected={quizType === 'appointed'}
          status={quizType === 'appointed' ? <Badge mode='prominent' /> : <Badge style={{ backgroundColor: '#818C99' }} mode='prominent' />}
          onClick={() => quizTypeFilter('appointed')}>
          Назначенные
        </StyledTabsItem>
        <StyledTabsItem selected={quizType === 'done'} onClick={() => quizTypeFilter('done')}>
          Пройденные
        </StyledTabsItem>
      </StyledTabs>
      <Search
        style={{
          maxWidth: '361px',
          width: '100%',
          margin: '0',
          padding: '0',
        }}
        value={search}
        onChange={onChange} />
    </StyledDiv>
  );
};

export default QuizMenu;
