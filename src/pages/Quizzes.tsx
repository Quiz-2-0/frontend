import React, { FC, useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { Div } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import styled from 'styled-components';
import QuizCardList from '@/ui-lib/widgets/QuizCardList';
import QuizMenu from '@/ui-lib/widgets/QuizMenu';
import { useGetAllQuizzesQuery } from '@/api/apiv2';
import { useSelector, useDispatch } from '@/store/store.types';
import { setFromCastle } from '@/store/allSlice/allSlice';

const StyledDiv = styled(Div)`
    max-width: 1074px;
    width: 100%;
    padding: 0;
`;

const Quizzes: FC = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { fromCastle } = useSelector((state) => state.all);
  const [search, setSearch] = useState('');
  const [quizType, setQuizType] = useState(fromCastle ? 'appointed' : 'all');
  const { data } = useGetAllQuizzesQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const [quizzesOnPage, setQuizzesOnPage] = useState(data);
  const [appointedQuizzes, setAppointedQuizzes] = useState(
    data?.some(({ appointed }) => appointed === true),
  );

  const quizNameFilter = quizzesOnPage?.filter(
    ({ name }) => name.toLowerCase().indexOf(search.toLowerCase()) > -1,
  );

  const quizTypeFilter = (type: string) => {
    setQuizType(type);
    if (type !== 'all') {
      if (type === 'appointed') {
        setQuizzesOnPage(data?.filter(({ appointed }) => appointed === true));
      } else {
        setQuizzesOnPage(data?.filter(({ isPassed }) => isPassed === true));
      }
    } else {
      setQuizzesOnPage(data);
    }
  };

  useEffect(() => {
    if (fromCastle && quizType === 'appointed') {
      dispatch(setFromCastle(false));
      setQuizType('appointed');
      quizTypeFilter('appointed');
    } else {
      setQuizzesOnPage(data);
      setAppointedQuizzes(data?.some(({ appointed }) => appointed === true));
    }
  }, [data, location]);

  return (
    <StyledDiv>
      <QuizMenu
        search={search}
        setSearch={setSearch}
        quizType={quizType}
        quizTypeFilter={quizTypeFilter}
        appointedQuizzes={appointedQuizzes} />
      <QuizCardList
        quizList={search !== '' ? quizNameFilter : quizzesOnPage}
        isIncomplete={false} />
    </StyledDiv>
  );
};

export default Quizzes;
