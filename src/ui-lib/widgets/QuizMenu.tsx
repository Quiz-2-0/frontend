/* eslint-disable @typescript-eslint/no-unsafe-call */
import React, { SetStateAction } from 'react';
import {
  Tabs,
  TabsItem,
  Search,
  Badge,
  Div,
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import styled from 'styled-components';

const StyledDiv = styled(Div)`
  padding: 0 0 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const StyledTabs = styled(Tabs)`
  max-width: 429px;
  width: 100%;
  height: 48px;

  & > div {
    display: flex;
    gap: 16px;
  }

  & > div > .vkuiTabsItem--selected {
    background-color: rgba(63, 138, 224, 0.05);
    color: #000;
  }

  & > div > .vkuiTabsItem--selected > .vkuiTabsItem__status > .vkuiBadge--mode-prominent {
    background-color: #ff3347;
  }

  & > div > .vkuiTabsItem--selected:hover {
    background: rgba(63, 138, 224, 0.15);
  }
`;

export const StyledTabsItem = styled(TabsItem)`
  padding: 0 16px;
  box-sizing: border-box;
  max-width: max-content;
  min-width: 125px;
  height: 100%;

  &:hover {
    background: none;
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

  &:hover > span {
    color: #000;
  }

  & > .vkuiTabsItem__status > .vkuiBadge--mode-prominent {
    background-color: #818C99;
  }

  &:hover > .vkuiTabsItem__status > .vkuiBadge--mode-prominent {
    background-color: #ff3347;
  }
`;

const QuizMenu: React.FC<{
  search: string,
  setSearch: any,
  quizType: string,
  quizTypeFilter: (type: string) => void,
  appointedQuizzes: boolean | undefined,
}> = ({
  search,
  setSearch,
  quizType,
  quizTypeFilter,
  appointedQuizzes,
}) => {
  const onChange = (e: { target: { value: SetStateAction<string>; }; }) => {
    setSearch(e.target.value);
  };

  return (
    <StyledDiv>
      <StyledTabs>
        <StyledTabsItem selected={quizType === 'all'} onClick={() => quizTypeFilter('all')}>
          Все квизы
        </StyledTabsItem>
        <StyledTabsItem
          selected={quizType === 'appointed'}
          status={<Badge mode='prominent' style={{ visibility: `${appointedQuizzes ? 'visible' : 'hidden'}` }} />}
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
