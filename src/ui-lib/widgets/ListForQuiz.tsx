/* eslint-disable ternary/no-unreachable */
/* eslint-disable ternary/nesting */
/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React, { FC, useState, useEffect } from 'react';
import { useParams } from 'react-router';
import styled from 'styled-components';
import Dropdown from './Dropdown';
import { StyledTabs, StyledTabsItem } from './QuizMenu';
import { Volume, Statistic } from '@/types/types';
import { useGetQuizQuery, useGetStatisticQuery } from '@/api/apiv2';
import ErrorParsing from './ErrorParsing';

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
  const { id } = useParams();

  const { data: quizData } = useGetQuizQuery(id);
  const { data: statisticsData } = useGetStatisticQuery(id);
  const [questions, setQuestions] = useState(quizData ? quizData.questions : []);
  const [statistics, setStatistics] = useState<Statistic[] | undefined>([]);
  const [listType, setListType] = useState('about');
  const quizTypeFilter = (type: string) => {
    setListType(type);
  };

  useEffect(() => {
    setQuestions(quizData ? quizData.questions : []);
  }, [quizData]);

  useEffect(() => {
    setStatistics(statisticsData);
  }, [statisticsData]);

  return (
    <Div>
      <StyledTabs>
        <StyledTabsItem style={{ letterSpacing: '-0.32px' }} selected={listType === 'about'} onClick={() => quizTypeFilter('about')}>
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
                <Dropdown
                  index={null}
                  name={el.name}
                  description={el.description}
                  answers={[]}
                  isReview={false} />
              ))
              : <p style={{ fontSize: '16px', color: '#818C99', paddingLeft: '16px' }}>Справочные материалы не найдены</p>}
          </List>
        ) : (quizData?.isPassed
          ? <ErrorParsing statistics={statistics} questions={questions} />
          : <p style={{ fontSize: '16px', color: '#818C99', paddingLeft: '16px' }}>Ошибок нет</p>
        )}
    </Div>
  );
};

export default ListForQuiz;
