/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React, { FC, useState } from 'react';
import styled from 'styled-components';
import Dropdown from '../Dropdown';
import { StyledTabs, StyledTabsItem } from './QuizMenu';
import { Volume } from '../../types/types';

const Div = styled.div`
    display: flex;
    flex-direction: column;
    gap: 6px;
    max-width: 1074px;
    width: 100%;
`;

const List = styled.ul`
    display: flex;
    flex-direction: column;
    width: 100%;
    list-style: none;
    padding: 0;
    margin: 0;
`;

const ListForQuiz: FC<{ volumes: Volume[] | undefined }> = ({ volumes }) => {
  const [listType, setListType] = useState('about');
  const quizTypeFilter = (type: string) => {
    setListType(type);
  };
  return (
    <Div>
      <StyledTabs>
        <StyledTabsItem selected={listType === 'about'} onClick={() => quizTypeFilter('about')}>
          Справочные материалы
        </StyledTabsItem>

        <StyledTabsItem selected={listType === 'analitics'} onClick={() => quizTypeFilter('analitics')}>
          Анализ ошибок
        </StyledTabsItem>
      </StyledTabs>
      {listType === 'about'
        ? (
          <List>
            {volumes && volumes.length !== 0
              ? volumes?.map((el: Volume) => (
                <Dropdown name={el.name} description={el.description} />
              ))
              : <p style={{ fontSize: '16px', color: '#818C99', paddingLeft: '16px' }}>Справочные материалы не найдены</p>}
          </List>
        ) : <p style={{ fontSize: '16px', color: '#818C99', paddingLeft: '16px' }}>Ошибок нет</p>}
    </Div>
  );
};

export default ListForQuiz;
