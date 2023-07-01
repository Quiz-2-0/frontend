/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React, { FC, useState } from 'react';
import { useNavigate } from 'react-router';
import { Div } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import styled from 'styled-components';
import QuizCardList from '../ui-lib/widgets/QuizCardList';
import QuizMenu from '../ui-lib/widgets/QuizMenu';
import { useGetAllQuizesQuery } from '../api/apiv2';

const StyledDiv = styled(Div)`
    max-width: 1074px;
    width: 100%;
    padding: 0;
`;

const Quizzes: FC = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const { data, error, isLoading } = useGetAllQuizesQuery();
  const quizNameFilter = data?.filter(
    ({ name }) => name.toLowerCase().indexOf(search.toLowerCase()) > -1,
  );
  return (
    <StyledDiv>
      <QuizMenu search={search} setSearch={setSearch} />
      <QuizCardList currentArr={quizNameFilter!} />
    </StyledDiv>
  );
};

export default Quizzes;
