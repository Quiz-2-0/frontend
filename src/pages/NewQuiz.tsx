import React, { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Icon24AddOutline } from '@vkontakte/icons';
import { Title } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import StyledDiv from '../ui-lib/StyledDiv';
import StyledButton from '../ui-lib/StyledButton';
import QuizCardList from '../ui-lib/widgets/QuizCardList';
import quizzes from '../constants/quizzes';
import ConfirmationPopup from '../ui-lib/widgets/ConfirmationPopup';

const NewQuiz: React.FC = () => {
  const navigate = useNavigate();
  const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = useState(false);
  return (
    <>
      <div>
        <StyledDiv
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px',
          }}>
          <Title size={24}>Создание квиза</Title>
          <StyledButton
            style={{ minWidth: '202px', margin: 0 }}
            onClick={() => navigate('/new-quiz/create')}>
            <Icon24AddOutline />
            Создать новый квиз
          </StyledButton>
        </StyledDiv>
        <StyledDiv>
          <Title size={24} style={{ marginBottom: '28px' }}>Черновики</Title>
          <QuizCardList
            quizList={quizzes}
            setIsConfirmationPopupOpen={setIsConfirmationPopupOpen} />
        </StyledDiv>
      </div>
      <ConfirmationPopup
        isConfirmationPopupOpen={isConfirmationPopupOpen}
        setIsConfirmationPopupOpen={setIsConfirmationPopupOpen}
        title='Удаление черновика'
        icon='delete'
        description='Хотите навсегда удалить черновик квиза?'
        blueButton='Подтвердить'
        whiteButton='Отменить' />
    </>
  );
};

export default NewQuiz;
