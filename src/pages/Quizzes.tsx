import React, { FC } from 'react';
import { useNavigate } from 'react-router';
import { Div } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import styled from 'styled-components';
import QuizCardList from '../ui-lib/widgets/QuizCardList';
import QuizMenu from '../ui-lib/widgets/QuizMenu';

const StyledDiv = styled(Div)`
    max-width: 1074px;
    width: 100%;
    padding: 0;
`;

const Quizzes: FC = () => {
  const navigate = useNavigate();

  return (
    <StyledDiv>
      <QuizMenu />
      <QuizCardList />
    </StyledDiv>
  );
};

export default Quizzes;
