/* eslint-disable import/order */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable ternary/no-unreachable */
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from '../store/store.types';
import {
  Title,
  Div,
  FormItem,
  Checkbox,
  Button,
  Tabs,
  TabsItem,
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import validator from 'validator';
import { Icon12EyeSlashOutline, Icon16View } from '@vkontakte/icons';
import StyledButton from '../ui-lib/StyledButton';
import StyledFormLayout from '../ui-lib/StyledFormLayout';
import StyledInput from '../ui-lib/StyledInput';

import { setRememberMe } from '../store/allSlice';
import { fetchUserData } from '../store/userSlice';
import styled from 'styled-components';

const Login: React.FC = () => {
  /// /// adds
  const dispatch = useDispatch();
  const { isRememberMe } = useSelector((state) => state.all);
  const { isLogged } = useSelector((state) => state.all);
  const [role, setRole] = useState('user');
  const [email, setEmail] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isButtonDisabled, setIsDisabled] = useState(true);
  const navigate = useNavigate();
  const changePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const resetForm = () => {
    setRole('user');
    setEmail('');
    setPassword('');
    dispatch(setRememberMe(false));
    setIsEmailValid(true);
    setIsPasswordValid(true);
    setIsPasswordVisible(false);
    setIsDisabled(true);
  };

  const onSubmit = () => {
    dispatch(
      fetchUserData({
        role,
        email,
        password,
      }),
    );
    // сбрасываю форму, только если юзер залогинен!!!
    if (!isLogged) {
      console.log({
        role,
        email,
        password,
        rememberMe: isRememberMe,
      });
      resetForm();
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    if (name === 'email') {
      setEmail(value);
    }
    if (name === 'password') {
      setPassword(value);
    }
  };

  const StyledResetButton = styled(Button)`
    max-width: fit-content;

    & > span > span {
      fontS-size: 15px;
      lineH-height: 20px;
      letter-spacing: -0.24px;
      font-weight: 400;
    }
  `;

  const StyledTabsItem = styled(TabsItem)`
    padding: 0;

    & > div {
      width: 100%;
      left: 0;
      right: 0;
    }
  `;

  return (
    <StyledFormLayout
      onSubmit={onSubmit}>
      <Title
        level='1'
        style={{
          paddingBottom: '40px',
          fontWeight: 600,
          fontSize: '20px',
          lineHeight: '24px',
          textAlign: 'center',
          letterSpacing: '0.38px',
          color: '#21272A',
        }}>
        Вход в личный кабинет
      </Title>

      <Tabs
        style={{
          fontSize: '16px',
          fontWeight: '500',
          lineHeight: '20px',
          letterSpacing: '-0.32px',
          paddingBottom: '12px',
        }}>
        <StyledTabsItem
          selected={role === 'user'}
          onClick={() => setRole('user')}>
          Сотрудник
        </StyledTabsItem>
        <StyledTabsItem
          selected={role === 'admin'}
          onClick={() => setRole('admin')}>
          Администратор
        </StyledTabsItem>
      </Tabs>

      <FormItem
        htmlFor='email'
        top='Логин'
        onBlur={() => {
          setIsEmailValid(validator.isEmail(email));
          setIsDisabled(!(validator.isEmail(email) && password.length >= 6));
        }}
        onChange={() => setIsEmailValid(true)}
        status={isEmailValid ? 'default' : 'error'}
        bottom={isEmailValid ? '' : 'Неверный логин, попробуйте ещё раз'}
        style={{
          padding: '0',
          fontWeight: '400',
          fontSize: '14px',
          lineHeight: '18px',
          letterSpacing: '-0.154px',
          color: '#21272a',
          paddingBottom: `${isEmailValid ? '24px' : '0px'}`,
        }}>
        <StyledInput
          id='email'
          type='email'
          placeholder='Email'
          name='email'
          value={email}
          onChange={onChange} />
      </FormItem>
      <FormItem
        top='Пароль'
        htmlFor='pass'
        onChange={() => setIsPasswordValid(true)}
        onBlur={() => {
          password.length >= 6
            ? setIsPasswordValid(true)
            : setIsPasswordValid(false);
          setIsDisabled(!(validator.isEmail(email) && password.length >= 6));
        }}
        status={isPasswordValid ? 'default' : 'error'}
        bottom={isPasswordValid ? '' : 'Введите пароль'}
        style={{
          padding: '0',
          fontWeight: '400',
          fontSize: '14px',
          lineHeight: '18px',
          letterSpacing: '-0.154px',
          color: '#21272a',
          paddingBottom: `${isPasswordValid ? '24px' : '0px'}`,
        }}>
        <StyledInput
          id='pass'
          type={isPasswordVisible ? 'text' : 'password'}
          placeholder='Пароль'
          name='password'
          value={password}
          after={
            isPasswordVisible ? (
              <Icon16View
                width={16}
                height={16}
                onClick={changePasswordVisibility} />
            ) : (
              <Icon12EyeSlashOutline
                width={16}
                height={16}
                onClick={changePasswordVisibility} />
            )
          }
          onChange={onChange} />
      </FormItem>
      <Div
        style={{
          padding: 0,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Checkbox
          checked={isRememberMe}
          style={{ padding: 0 }}
          onClick={() => {
            dispatch(setRememberMe(!isRememberMe));
          }}>
          Запомнить меня
        </Checkbox>
        <StyledResetButton
          type='button'
          size='s'
          mode='link'
          onClick={() => {
            navigate('/reset-password');
            resetForm();
          }}
          stretched>
          Сбросить пароль
        </StyledResetButton>
      </Div>
      <FormItem style={{ padding: 0 }}>
        <StyledButton
          size='l'
          disabled={isButtonDisabled}
          onClick={onSubmit}
          stretched>
          Войти
        </StyledButton>
      </FormItem>
    </StyledFormLayout>
  );
};

export default Login;
