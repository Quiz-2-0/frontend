/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable import/order */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable ternary/no-unreachable */
import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Navigate, useNavigate } from 'react-router';
import { useDispatch, useSelector } from '../store/store.types';
import { useLoginMutation, jwt } from '../api/apiv2';
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
import styled from 'styled-components';
import { setLogged, setRememberMe } from '../store/allSlice/allSlice';
import { setCurrentUser } from '../store/userSlice/userSlice';
import { TUser } from '../types/types';

const StyledResetButton = styled(Button)`
  max-width: fit-content;

  & > span > span {
    font-size: 15px;
    line-height: 20px;
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

const Login: React.FC = () => {
  /// /// это хук который у нас содержит все данные о запросе к серверу
  /// / в теории можно и в редакт ничего не толкать ,так как в хуке все сохраняется да
  // еще и кэшируется, поэтому как будет у нас сервер и реальные запросы я попробую настроить
  const [login, { data, error }] = useLoginMutation({
    fixedCacheKey: 'shared-update-post',
  });
  const dispatch = useDispatch();
  const [role, setRole] = useState('EMP');
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
    setRole('EMP');
    setEmail('');
    setPassword('');
    dispatch(setRememberMe(false));
    setIsEmailValid(true);
    setIsPasswordValid(true);
    setIsPasswordVisible(false);
    setIsDisabled(true);
  };

  const onSubmit = async (e: FormEvent<HTMLElement>) => {
    e.preventDefault();
    const user = await login({ role, email, password }).unwrap();

    const { access, ...rest } = user;
    const inMemory = localStorage.getItem('isRemember') === 'true';
    jwt.set(access, inMemory);
    dispatch(setCurrentUser(rest as TUser));
    resetForm();

    if (user) {
      navigate('/');
    }
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    if (name === 'email') {
      setEmail(value);
    }
    if (name === 'password') {
      setPassword(value);
    }
  };
  /// / prosto test
  if (error) {
    return <p>Ошибка</p>;
  }
  const setUserInMemory = () => {
    if (localStorage.getItem('isRemember') === 'true') {
      localStorage.setItem('isRemember', 'false');
      return;
    }
    localStorage.setItem('isRemember', 'true');
  };

  return (
    localStorage.getItem('JWT') || sessionStorage.getItem('JWT')
      ? <Navigate to='/' />
      : (
        <StyledFormLayout
          style={{ fontFamily: 'SFProDisplay' }}
          onSubmit={(e) => onSubmit(e)}>
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
              selected={role === 'EMP'}
              onClick={() => setRole('EMP')}>
              Сотрудник
            </StyledTabsItem>
            <StyledTabsItem
              selected={role === 'AD'}
              onClick={() => setRole('AD')}>
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
              fontFamily: 'SFProDisplay !important',
              color: '#333 !important',
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
              fontFamily: 'SFProDisplay',
              color: '#333',
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
              style={{ padding: 0 }}
              onClick={() => {
                setUserInMemory();
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
              type='submit'
              size='l'
              disabled={isButtonDisabled}
              stretched>
              Войти
            </StyledButton>
          </FormItem>
        </StyledFormLayout>
      )
  );
};

export default Login;
