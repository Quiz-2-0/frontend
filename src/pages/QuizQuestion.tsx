import React from 'react';
import {
  Div,
  Title,
  Headline,
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import StyledButton from '../ui-lib/StyledButton';

const QuizQuestion: React.FC = () => {
  const QuizImage = '../images/quizzes/quiz1.png';

  return (
    <Div style={{ padding: 0 }}>
      <Title weight='3'>Квиз «Работа в команде»</Title>
      <Headline weight='3' style={{ marginTop: '20px' }}>Вопрос 1/3</Headline>
      <Title style={{ marginTop: '20px' }}>Кто из перечисленных членов нашей команды является Back-end Developer?</Title>
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
            <li
              style={{
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
              Архипова Мария
            </li>
            <li
              style={{
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
              Надежда Лебедева
            </li>
            <li
              style={{
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
              Георгий Трубачёв
            </li>
            <li
              style={{
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
              Илья Иванов
            </li>
          </ul>
          <StyledButton style={{ width: '167px' }}>Дальше</StyledButton>
        </Div>
        <img
          style={{
            padding: 0,
            width: '418px',
            height: '230px',
            borderRadius: '8px',
            objectFit: 'cover',
          }}
          src={QuizImage}
          alt='Квиз' />
      </Div>
    </Div>
  );
};

export default QuizQuestion;
