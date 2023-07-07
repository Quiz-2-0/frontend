/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable ternary/nesting */
/* eslint-disable no-nested-ternary */
import React, { FC } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Title, Text, Div } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import StyledButton from '../StyledButton';
import image from '../../images/results__image.png';

const Results: FC<{
  rightAnswers: number,
  questions: number,
  quizName: string | undefined,
}> = ({ rightAnswers, questions, quizName }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <Div style={{
      maxWidth: '500px',
      width: '100%',
      padding: '0',
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
      justifyContent: 'space-between',
      alignItems: 'center',
      margin: '40px auto 0',
    }}>
      <img src={image} alt='Поздравляем!' style={{ maxWidth: '400px', borderRadius: '8px' }} />
      <Title
        weight='3'
        style={{ paddingTop: '8px', fontWeight: 500 }}>
        {`Квиз «${quizName}» пройден!`}
      </Title>
      <Text style={{ fontSize: '20px', lineHeight: '24px', letterSpacing: '0.38px' }}>
        {`Вы ответили правильно на ${rightAnswers} вопрос${rightAnswers === 1 ? '' : (rightAnswers > 4 || rightAnswers) === 0 ? 'ов' : 'а'} из ${questions}`}
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
            onClick={() => navigate(`/quizzes/${id}/mistakes`)}
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