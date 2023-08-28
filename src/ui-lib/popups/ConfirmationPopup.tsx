/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable ternary/nesting */
/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import React, { FC } from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import '@vkontakte/vkui/dist/vkui.css';
import { Icon28CheckCircleOutline, Icon28DeleteOutline } from '@vkontakte/icons';
import Background from '../styled-components/Background';
import StyledButton from '../styled-components/StyledButton';
import { useRemoveQuizMutation } from '@/api/api';

const StyledDiv = styled.div`
  max-width: 500px;
  height: min-content;
  width: 100%;
  padding: 48px;
  box-sizing: border-box;
  background: white;
  border-radius: 16px;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.06),
    0 4px 8px 0 rgba(0, 0, 0, 0.04);
`;

const ConfirmationPopup: FC<{
  quizId: number,
  isConfirmationPopupOpen: boolean,
  setIsConfirmationPopupOpen: any,
  title: string,
  icon: string,
  description: string,
  blueButton: string,
  whiteButton: string,
  blueButtonLink: string,
  whiteButtonLink: string,
  setIsChooseQuizzesPopupOpen: any,
}> = ({
  quizId,
  isConfirmationPopupOpen,
  setIsConfirmationPopupOpen,
  title,
  icon,
  description,
  blueButton,
  whiteButton,
  blueButtonLink,
  whiteButtonLink,
  setIsChooseQuizzesPopupOpen,
}) => {
  const navigate = useNavigate();
  const [removeQuiz] = useRemoveQuizMutation();
  const removeQuizById = async () => {
    await removeQuiz(quizId);
  };

  return (
    <Background
      style={{
        visibility: `${isConfirmationPopupOpen ? 'visible' : 'hidden'}`,
        opacity: `${isConfirmationPopupOpen ? '1' : '0'}`,
      }}>
      <StyledDiv>
        <h2
          style={{
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            gap: '12px',
            margin: '0 0 16px',
            fontSize: '20px',
            fontWeight: 600,
            lineHeight: '24px',
            letterSpacing: '0.38px',
          }}>
          {icon === 'check'
            ? <Icon28CheckCircleOutline fill='#43A843' />
            : icon === 'none'
              ? <div />
              : <Icon28DeleteOutline fill='#99A2AD' />}
          {title}
        </h2>
        <p
          style={{
            margin: 0,
            fontSize: '15px',
            fontWeight: '400',
            lineHeight: '20px',
          }}>
          {description}
        </p>
        <div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '16px',
            marginTop: '32px',
          }}>
          <StyledButton
            style={{ margin: 0, width: '100%' }}
            onClick={() => {
              if (icon === 'delete') {
                removeQuizById();
              } else if (blueButton === 'Назначить квиз') {
                setIsChooseQuizzesPopupOpen(true);
              }
              setIsConfirmationPopupOpen(false);
              blueButtonLink !== '' && navigate(blueButtonLink);
            }}>
            {blueButton}
          </StyledButton>
          <StyledButton
            style={{ margin: 0, width: '100%' }}
            onClick={() => {
              setIsConfirmationPopupOpen(false);
              whiteButtonLink !== '' && navigate(whiteButtonLink);
            }}
            mode='outline'>
            {whiteButton}
          </StyledButton>
        </div>
      </StyledDiv>
    </Background>
  );
};

export default ConfirmationPopup;
