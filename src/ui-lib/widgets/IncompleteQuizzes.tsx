import React from 'react';
import {
  Title,
  Headline,
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import StyledDiv from '../styled-components/StyledDiv';
import { useGetIncompleteQuizzesQuery } from '@/api/apiv2';
import QuizCardList from './QuizCardList';
import QuizCard from './QuizCard';

const IncompleteQuizzes: React.FC = () => {
  const { data: incompleteQuizzes } = useGetIncompleteQuizzesQuery();

  console.log(incompleteQuizzes);

  return (
    <StyledDiv
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        gap: '24px',
      }}>
      <Title
        style={{ textAlign: 'left' }}
        level='2'>
        Незавершённые квизы
      </Title>
      {incompleteQuizzes && incompleteQuizzes.length === 0 ? (
        <div
          style={{
            width: '100%',
            minHeight: '150px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            gap: '10px',
          }}>
          <Headline>У вас нет незавершённых квизов.</Headline>
          <Headline>Перейдите в раздел «Квизы», чтобы продолжить обучение.</Headline>
        </div>
      ) : (
        <QuizCardList
          quizList={incompleteQuizzes}
          setIsConfirmationPopupOpen={undefined} />
      )}
    </StyledDiv>
  );
};

export default IncompleteQuizzes;
