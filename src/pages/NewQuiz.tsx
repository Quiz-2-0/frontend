import React, { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Icon24AddOutline } from '@vkontakte/icons';
import { Title } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import StyledDiv from '@/ui-lib/styled-components/StyledDiv';
import StyledButton from '@/ui-lib/styled-components/StyledButton';
import QuizCardList from '@/ui-lib/widgets/QuizCardList';
import { useGetQuizzesQuery } from '@/api/api';

const NewQuiz: FC = () => {
  const { data: quizzes } = useGetQuizzesQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const [quizzesList, setQuizzesList] = useState(quizzes);
  const navigate = useNavigate();
  useEffect(() => {
    setQuizzesList(quizzes);
  }, [quizzes]);

  return (
    <div>
      <StyledDiv
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
        }}>
        <Title level='1'>Создание квиза</Title>
        <StyledButton
          style={{ minWidth: '202px', margin: 0 }}
          onClick={() => navigate(`/new-quiz/${0}`)}>
          <Icon24AddOutline />
          Создать новый квиз
        </StyledButton>
      </StyledDiv>
      <StyledDiv>
        <Title level='1' style={{ marginBottom: '28px' }}>Черновики</Title>
        <QuizCardList
          quizList={quizzesList}
          isIncomplete={false} />
      </StyledDiv>
    </div>
  );
};

export default NewQuiz;
