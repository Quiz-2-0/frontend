import React, { FC } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Title, Text, Div } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import StyledButton from '../styled-components/StyledButton';
import successImage from '@/assets/images/results_success.png';
import failImage from '@/assets/images/results_fail.png';
import { useGetStatisticQuery } from '@/api/api';

const Results: FC<{
  quizName: string | undefined,
}> = ({ quizName }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data } = useGetStatisticQuery(Number(id));

  const handleFirstButtonClick = () => {
    if (data && data.result === false) {
      navigate(`/quizzes/${id}`);
    } else {
      navigate(`/quizzes/${id}/review`);
    }
  };
  const handleSecondButtonClick = () => {
    navigate(`/quizzes/${id}`);
  };

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
        src={data?.result ? successImage : failImage}
        alt={data?.result ? 'Поздравляем!' : 'Квиз не пройден'}
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
        {data?.result ? `Квиз «${quizName}» пройден!` : `Квиз «${quizName}» не пройден!`}
      </Title>
      <Text style={{
        fontSize: '20px',
        lineHeight: '24px',
        letterSpacing: '0.38px',
        textAlign: 'center',
      }}>
        {data?.info}
      </Text>
      <Div
        style={{
          padding: 0,
          width: 'min-content',
          display: 'flex',
          gap: '12px',
        }}>
        <StyledButton
          onClick={handleFirstButtonClick}
          style={{
            minWidth: '167px',
            width: 'fit-content',
            margin: 0,
            fontSize: '15px',
            lineHeight: '20px',
            letterSpacing: '-0.24px',
          }}>
          {data?.result ? 'Разобрать ошибки' : 'Пройти заново'}
        </StyledButton>
        <StyledButton
          mode='outline'
          onClick={handleSecondButtonClick}
          style={{
            minWidth: '167px',
            width: 'fit-content',
            margin: 0,
            fontSize: '15px',
            lineHeight: '20px',
            letterSpacing: '-0.24px',
          }}>
          {data?.result ? 'Пройти заново' : 'Справочный материал'}
        </StyledButton>
      </Div>
    </Div>
  );
};

export default Results;
