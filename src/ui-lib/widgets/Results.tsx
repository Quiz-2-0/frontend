/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-plusplus */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable ternary/nesting */
/* eslint-disable no-nested-ternary */
import React, { FC, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Title, Text, Div } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import StyledButton from '../styled-components/StyledButton';
import image from '@/assets/images/results__image.png';
import { useGetStatisticQuery } from '@/api/apiv2';
import { pluralsFull } from '@/constants/plurals';

const Results: FC<{
  questions: number,
  quizName: string | undefined,
}> = ({ questions, quizName }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [rightAnswers, setRightAnswers] = useState<number | undefined>(0);

  const { data, error, isLoading } = useGetStatisticQuery(Number(id));
  useEffect(() => {
    setRightAnswers(data?.filter((answer) => (answer !== undefined && answer.is_right)).length);
  }, [data]);

  return (
    <Div style={{
      maxWidth: '500px',
      width: '100%',
      padding: '0 40px 0 0',
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
      justifyContent: 'space-between',
      alignItems: 'center',
      margin: '40px auto 0',
    }}>
      <img
        src={image}
        alt='Поздравляем!'
        style={{
          width: '400px',
          borderRadius: '8px',
          height: '270px',
          objectFit: 'cover',
          objectPosition: 'center',
        }} />
      <Title
        weight='3'
        style={{ paddingTop: '8px', fontWeight: 500, textAlign: 'center' }}>
        {`Квиз «${quizName}» пройден!`}
      </Title>
      <Text style={{
        fontSize: '20px',
        lineHeight: '24px',
        letterSpacing: '0.38px',
        textAlign: 'center',
      }}>
        {`Вы ответили правильно на ${pluralsFull.questions(rightAnswers ?? 0)} из ${questions}`}
      </Text>
      <Div
        style={{
          padding: 0,
          width: 'min-content',
          display: 'flex',
          gap: '12px',
        }}>
        {rightAnswers !== questions && (
          <StyledButton
            mode='outline'
            onClick={() => navigate(`/quizzes/${id}/review`)}
            style={{
              width: '167px',
              margin: 0,
              fontSize: '15px',
              lineHeight: '20px',
              letterSpacing: '-0.24px',
            }}>
            Разобрать ошибки
          </StyledButton>
        )}
        <StyledButton
          onClick={() => navigate(`/quizzes/${id}`)}
          style={{
            width: '167px',
            margin: 0,
            fontSize: '15px',
            lineHeight: '20px',
            letterSpacing: '-0.24px',
          }}>
          Пройти заново
        </StyledButton>
      </Div>
    </Div>
  );
};

export default Results;
