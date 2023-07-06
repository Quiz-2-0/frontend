/* eslint-disable ternary/nesting */
/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable ternary/no-unreachable */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  Div,
  Title,
  Headline,
  Text,
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router';
import StyledButton from '../ui-lib/StyledButton';
import { useGetQuizQuery } from '../api/apiv2';
import ProgressBar from '../ui-lib/ProgressBar';
import { useDispatch } from '../store/store.types';
import { setLoaderState } from '../store/allSlice/allSlice';
import { Answer } from '../types/types';

const Answers = styled.li<{ selectedAnswer: number, cardId: number }>`
  cursor: pointer;
  padding: 16px;
  list-style: none;
  max-width: 447px;
  width: 100%;
  min-height: min-content;
  height: 100%;
  box-sizing: border-box;
  border-radius: 4px;
  display: flex;
  text-align: center;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid ${({ selectedAnswer, cardId }) => (selectedAnswer === cardId ? '#3F8AE0' : '#DCE1E6')};
  background: ${({ selectedAnswer, cardId }) => (selectedAnswer === cardId ? 'rgba(63, 138, 224, 0.15)' : 'none')};

  &:hover {
    border: 1px solid ${({ selectedAnswer, cardId }) => (selectedAnswer === cardId ? '#3F8AE0' : 'rgba(63, 138, 224, 0.15)')};
    background: ${({ selectedAnswer, cardId }) => (selectedAnswer === cardId ? 'rgba(63, 138, 224, 0.2)' : 'rgba(63, 138, 224, 0.05)')};
  }
`;

const QuizQuestion: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();

  const { data, error, isLoading } = useGetQuizQuery(id);

  const [progressObject, setProgress] = useState({ 0: '' });
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(0);
  const [questions, setQuestions] = useState(data ? data.questions : []);
  const [allAnswers, setAllAnswers] = useState<(Answer | undefined)[]>([]);
  const [rightAnswersAmount, setRightAnswersAmount] = useState(0);

  useEffect(() => {
    setQuestions(data ? data.questions : []);
  }, [data]);

  useEffect(() => {
    setRightAnswersAmount(
      allAnswers.filter((answ) => (answ !== undefined && answ.isAnswerRight === true)).length,
    );
  }, [allAnswers]);

  const setNextPage = () => {
    const answ = questions[currentPage].answers.find(({ id }) => id === selectedAnswer);
    setAllAnswers([...allAnswers, answ]);
    setCurrentPage(currentPage + 1);
    setSelectedAnswer(0);
    if (currentPage !== questions.length) {
      setProgress({ ...progressObject, [currentPage + 1]: ' ' });
    }
  };

  const selectAnswer = (answerId: number) => {
    setSelectedAnswer(answerId);
  };

  /* if (isLoading) { dispatch(setLoaderState(true)); } */

  return (
    <Div style={{ padding: 0, width: '100%', maxWidth: '914px' }}>
      <Title
        weight='3'
        style={{ paddingBottom: '40px', fontWeight: 500 }}>
        {currentPage === questions.length ? `Поздравляем, квиз «${data?.name}» пройден.` : `Квиз «${data?.name}»`}
      </Title>
      {currentPage === questions.length
        ? (
          <>
            <Headline weight='3'>
              {`Вы ответили правильно на ${rightAnswersAmount} вопрос${rightAnswersAmount === 1 ? '' : ((rightAnswersAmount > 4 || rightAnswersAmount) === 0 ? 'ов' : 'а')} из ${questions.length}`}
            </Headline>
            <Text style={{ paddingTop: '12px' }}>{rightAnswersAmount === questions.length ? 'Отличный результат, самое время продолжить строить замок мечты!' : 'Самое время разобрать ошибки, либо попробовать пройти ещё раз.'}</Text>
            <Div style={{
              padding: 0,
              marginTop: '32px',
              width: 'min-content',
              display: 'flex',
              gap: '12px',
            }}>
              {rightAnswersAmount !== questions.length
                && <StyledButton mode='outline' onClick={() => navigate('/quizzes')} style={{ width: '167px' }}>Разобрать ошибки</StyledButton>}
              <StyledButton onClick={() => navigate('/quizzes')} style={{ width: '167px' }}>К списку квизов</StyledButton>
            </Div>
          </>
        ) : (
          <>
            <ProgressBar questionArr={questions} progressObject={progressObject} />
            <Headline weight='3' style={{ marginTop: '20px' }}>{`Вопрос ${currentPage + 1}/${data?.question_amount}`}</Headline>
            <Title style={{ margin: '20px 0 32px' }}>{questions[currentPage].text}</Title>
            <ul
              style={{
                listStyle: 'none',
                padding: '0',
                margin: '0',
                width: '100%',
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '20px',
                justifyItems: 'start',
                alignItems: 'start',
                justifyContent: 'start',
                alignContent: 'start',
              }}>
              {questions[currentPage].answers.map((el) => (
                <Answers
                  key={el.id}
                  selectedAnswer={selectedAnswer}
                  cardId={el.id}
                  onClick={() => selectAnswer(el.id)}>
                  {el.text}
                </Answers>
              ))}
            </ul>
            <StyledButton onClick={setNextPage} disabled={selectedAnswer === 0} style={{ width: '167px', margin: '32px auto 0' }}>Дальше</StyledButton>
          </>
        )}
    </Div>
  );
};

export default QuizQuestion;
