import React, { useState } from 'react';
import {
  Div,
  Title,
  Headline,
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import { Navigate, useParams } from 'react-router';
import StyledButton from '../ui-lib/StyledButton';
import { useGetQuizQuery } from '../api/apiv2';
import ProgressBar from '../ui-lib/ProgressBar';
import { useDispatch } from '../store/store.types';
import { setLoaderState } from '../store/allSlice/allSlice';

const QuizQuestion: React.FC = () => {
  const { id } = useParams();
  const [progressObject, setProgress] = useState({ 0: '' });
  const [currentPage, setCurrentPage] = useState(0);
  const { data, error, isLoading } = useGetQuizQuery(id);
  const dispatch = useDispatch();
  console.log(progressObject);
  const setNextPage = () => {
    if (currentPage + 1 === data?.question_amount) { return; }
    setCurrentPage(currentPage + 1);
    setProgress({ ...progressObject, [currentPage + 1]: ' ' });
  };

  /* if (isLoading) { dispatch(setLoaderState(true)); } */

  return (
    data!.questions.length > 0
      ? (
        <Div style={{ padding: 0 }}>
          <Title weight='3'>{data?.name}</Title>
          <ProgressBar questionArr={data!.questions} progressObject={progressObject} />
          <Headline weight='3' style={{ marginTop: '20px' }}>{`Вопрос ${currentPage + 1}/${data!.question_amount}`}</Headline>
          <Title style={{ marginTop: '20px' }}>{data?.questions[currentPage].text}</Title>
          <Div
            style={{
              margin: '32px 0 0 0',
              padding: 0,
              display: 'flex',
              flexDirection: 'row',
              gap: '32px',
              justifyContent: 'start',
              alignItems: 'flex-end',
            }}>
            <Div style={{ padding: 0 }}>
              <ul
                style={{
                  listStyle: 'none',
                  padding: '0',
                  margin: '0',
                  width: '464px',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '20px',
                  justifyItems: 'start',
                  alignItems: 'start',
                  justifyContent: 'start',
                  alignContent: 'start',
                }}>
                {data?.questions[currentPage].answers.map((el, index) => (
                  <li
                    key={el.id}
                    style={{
                      cursor: 'pointer',
                      listStyle: 'none',
                      width: '222px',
                      height: '52px',
                      border: '1px solid #DCE1E6',
                      borderRadius: '4px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    {el.text}
                  </li>

                ))}

              </ul>
              <StyledButton onClick={setNextPage} style={{ width: '167px' }}>Дальше</StyledButton>
            </Div>
            <img
              style={{
                padding: 0,
                width: '418px',
                height: '230px',
                borderRadius: '8px',
                objectFit: 'cover',
              }}
              src={data?.questions[currentPage].image}
              alt='Квиз' />
          </Div>
        </Div>
      )
      : <Navigate to='/quizzes' />
  );
};

export default QuizQuestion;
