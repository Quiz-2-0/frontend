/* eslint-disable @typescript-eslint/no-misused-promises */
import React, {
  FC,
  useState,
  useEffect,
  FormEvent,
} from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { z } from 'zod';
import {
  Title,
  Text,
  FormItem,
} from '@vkontakte/vkui';
import { useRecoverPasswordMutation } from '@/api/api';
import '@vkontakte/vkui/dist/vkui.css';
import StyledButton from '@/ui-lib/styled-components/StyledButton';
import StyledFormLayout from '@/ui-lib/styled-components/StyledFormLayout';
import StyledInput from '@/ui-lib/styled-components/StyledInput';
import buttonIcon from '@/assets/images/icons/button_icon.svg';
import BackButton from '@/ui-lib/styled-components/BackButton';
import ButtonIcon from '@/ui-lib/styled-components/ButtonIcon';
import AuthLayout from '@/ui-lib/layouts/AuthLayout';

const ResendPasswordButton = styled.button`
  margin: 24px 0 0 0;
  padding: 0;
  background-color: transparent;
  color: #5181b8;
  border: none;
  font-size: 15px;
  line-height: 20px;
  text-align: left;
  cursor: pointer;
`;

const ResetPassword: FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [email, setEmail] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [timer, setTimer] = useState(30);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const navigate = useNavigate();
  const emailSchema = z.string().email();
  const [recoverPassword] = useRecoverPasswordMutation();
  const buttonText = isSubmitted ? 'Войти' : 'Отправить пароль';

  const isButtonDisabled = !isEmailValid || email === '';

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isTimerActive) {
      intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [isTimerActive]);

  useEffect(() => {
    if (timer === 0) {
      setIsTimerActive(false);
    }
  }, [timer]);

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await recoverPassword(email);
    if (isSubmitted) {
      navigate('/login');
    } else {
      setIsSubmitted(true);
      setIsTimerActive(true);
      setTimer(30);
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setEmail(value);
    setIsEmailValid(true);
  };

  const handleBlur = () => {
    try {
      emailSchema.parse(email);
      setIsEmailValid(true);
    } catch (err) {
      setIsEmailValid(false);
    }
  };

  const handleBackButtonClick = () => {
    if (isSubmitted) {
      setIsSubmitted(false);
    } else {
      navigate('/login');
    }
  };

  return (
    <AuthLayout>
      <StyledFormLayout
        onSubmit={handleSubmit}>
        <BackButton type='button' onClick={handleBackButtonClick}>
          <ButtonIcon src={buttonIcon} alt='Стрелочка назад' />
          Назад
        </BackButton>
        {isSubmitted ? ( // eslint-disable-line ternary/no-unreachable
          <>
            <Text
              weight='3'
              style={{
                marginTop: '24px',
                fontSize: '15px',
                lineHeight: '20px',
                letterSpacing: '-0.7px',
              }}>
              Новый пароль был отправлен на почту
            </Text>
            <Title
              style={{
                marginTop: '8px',
                fontSize: '20px',
                lineHeight: '24px',
              }}>
              {email}
            </Title>
            {isTimerActive ? (
              <Text
                style={{
                  marginTop: '24px',
                  fontSize: '13px',
                  lineHeight: '16px',
                  letterSpacing: '-0.7px',
                }}>
                {`отправить пароль ещё раз через ${formatTime(timer)}`}
              </Text>
            ) : (
              <ResendPasswordButton type='submit'>
                отправить пароль ещё раз
              </ResendPasswordButton>
            )}
          </>
        ) : (
          <>
            <Title
              level='1'
              style={{
                marginTop: '24px',
                fontWeight: 600,
                fontSize: '20px',
                lineHeight: '24px',
                textAlign: 'left',
                color: '#21272A',
              }}>
              Сброс пароля
            </Title>
            <Text
              weight='3'
              style={{
                marginTop: '8px',
                fontSize: '14px',
                lineHeight: '20px',
              }}>
              Введите рабочую почту, которая подключена к образовательной
              платформе.
            </Text>
            <FormItem
              htmlFor='passwordReset'
              style={{
                marginTop: '24px',
                padding: '0',
              }}
              onBlur={handleBlur}
              status={isEmailValid ? 'default' : 'error'}
              bottom={!isEmailValid && 'Неправильный формат почты'}>
              <StyledInput
                id='passwordReset'
                type='email'
                value={email}
                placeholder='e-mail'
                onChange={handleEmailChange} />
            </FormItem>
          </>
        )}
        <StyledButton
          type='submit'
          size='l'
          stretched
          disabled={isButtonDisabled}>
          {buttonText}
        </StyledButton>
      </StyledFormLayout>
    </AuthLayout>
  );
};

export default ResetPassword;
