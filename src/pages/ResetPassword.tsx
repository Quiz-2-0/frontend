/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import React, {
  FunctionComponent,
  useState,
  useEffect,
  FormEvent,
} from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { z } from 'zod';
import {
  SplitLayout,
  SplitCol,
  FormLayout,
  Title,
  Text,
  FormItem,
  Input,
  Button,
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import { useDispatch } from '../store/store.types';
import { resetPassword } from '../store/allSlice';

const BackgroundImageWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BackgroundImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
`;

const BackButton = styled.button`
  margin: 0;
  padding: 0;
  width: 70px;
  height: 20px;
  background-color: transparent;
  color: #21272A;
  border: none;
  font-size: 15px;
  line-height: 20px;
  text-align: left;
  cursor: pointer;
`;

const ButtonIcon = styled.img`
  width: 13px;
  height: 12px;
  padding-right: 12px;
`;

const ResendPasswordButton = styled.button`
  margin: 24px 0 0 0;
  padding: 0;
  background-color: transparent;
  color: #5181B8;
  border: none;
  font-size: 15px;
  line-height: 20px;
  text-align: left;
  cursor: pointer;
`;

const StyledInput = styled(Input)`
  font-size: 16px;
  color: #697077;
`;

const ErrorSpan = styled.span`
  position: absolute;
  left: 0;
  top: 68px;
  color: #DA1E28;
  font-size: 14px;
  line-height: 16px;
`;

const ResetPassword: FunctionComponent = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [email, setEmail] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [timer, setTimer] = useState(30);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const navigate = useNavigate();
  const loginBackground = './images/placeholder.png';
  const buttonIcon = './images/button_icon.svg';
  const dispatch = useDispatch();
  const emailSchema = z.string().email();

  const buttonText = isSubmitted ? 'Войти' : 'Отправить новый пароль'; // eslint-disable-line ternary/no-unreachable

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
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    dispatch(resetPassword(email));
    e.preventDefault();
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
    } catch (error) {
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
    <SplitLayout>
      <SplitCol style={{ margin: '72px 0 0 189px' }}>
        <NavLink className='logo' to='/'>
          Logo
        </NavLink>
        <FormLayout
          onSubmit={handleSubmit}
          style={{
            marginTop: '135px',
            width: '410px',
            height: 'auto',
            padding: '32px',
            border: '1px solid #C1C7CD',
            borderRadius: '32px',
            boxSizing: 'border-box',
          }}>
          <BackButton
            onClick={handleBackButtonClick}>
            <ButtonIcon
              src={buttonIcon}
              alt='Стрелочка назад' />
            Назад
          </BackButton>
          {isSubmitted ? ( // eslint-disable-line ternary/no-unreachable
            <>
              <Title
                weight='3'
                style={{
                  marginTop: '24px',
                }}>
                Новый пароль был успешно отправлен на почту
              </Title>
              <Title
                style={{
                  marginTop: '16px',
                }}>
                {email}
              </Title>
              {isTimerActive ? (
                <Text
                  style={{
                    marginTop: '20px',
                  }}>
                  {`отправить пароль ещё раз через ${formatTime(timer)}`}
                </Text>
              ) : (
                <ResendPasswordButton type='submit'>отправить пароль ещё раз</ResendPasswordButton>
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
                  letterSpacing: '0.38px',
                  color: '#21272A',
                }}>
                Сброс пароля
              </Title>
              <Text
                weight='3'
                style={{
                  marginTop: '8px',
                }}>
                Введите рабочую почту, которая подключена к образовательной платформе.
              </Text>
              <FormItem
                htmlFor='passwordReset'
                style={{
                  padding: '28px 0 0 0',
                  position: 'relative',
                }}
                status={isEmailValid ? 'valid' : 'error'}>
                <StyledInput
                  id='passwordReset'
                  type='email'
                  value={email}
                  placeholder='Введите рабочую почту'
                  onChange={handleEmailChange}
                  onBlur={handleBlur} />
                {isEmailValid // eslint-disable-line ternary/no-unreachable
                  ? null
                  : <ErrorSpan>Неправильный формат почты</ErrorSpan>}
              </FormItem>
            </>
          )}
          <Button
            type='submit'
            size='l'
            stretched
            disabled={isButtonDisabled}
            style={{
              marginTop: '36px',
              borderRadius: '4px',
              backgroundColor: '#5181B8',
            }}>
            {buttonText}
          </Button>
        </FormLayout>
      </SplitCol>
      <SplitCol>
        <BackgroundImageWrapper>
          <BackgroundImage src={loginBackground} alt='Изображение' />
        </BackgroundImageWrapper>
      </SplitCol>
    </SplitLayout>
  );
};

export default ResetPassword;
