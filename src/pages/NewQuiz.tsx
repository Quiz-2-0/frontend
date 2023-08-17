import React, { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Icon24AddOutline } from '@vkontakte/icons';
import { Title } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import StyledDiv from '@/ui-lib/styled-components/StyledDiv';
import StyledButton from '@/ui-lib/styled-components/StyledButton';
import QuizCardList from '@/ui-lib/widgets/QuizCardList';
import quizzes from '@/constants/quizzes';
import ConfirmationPopup from '@/ui-lib/popups/ConfirmationPopup';

const NewQuiz: React.FC = () => {
  const quizId = quizzes.length;
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
          <Title level='1'>Создание квиза</Title>
          <StyledButton
            style={{ minWidth: '202px', margin: 0 }}
            onClick={() => navigate(`/new-quiz/${quizId}`)}>
            <Icon24AddOutline />
            Создать новый квиз
          </StyledButton>
        </StyledDiv>
        <StyledDiv>
          <Title level='1' style={{ marginBottom: '28px' }}>Черновики</Title>
          <QuizCardList
            quizList={quizzes}
            setIsConfirmationPopupOpen={setIsConfirmationPopupOpen}
            isCompleted={false} />
        </StyledDiv>
      </div>
      <ConfirmationPopup
        isConfirmationPopupOpen={isConfirmationPopupOpen}
        setIsConfirmationPopupOpen={setIsConfirmationPopupOpen}
        title='Удаление черновика'
        icon='delete'
        description='Хотите навсегда удалить черновик квиза?'
        blueButton='Подтвердить'
        whiteButton='Отменить'
        blueButtonLink=''
        whiteButtonLink='' />
    </>
  );
};

export default NewQuiz;
