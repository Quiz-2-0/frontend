/* eslint-disable @typescript-eslint/no-misused-promises */
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
import { useLoginMutation, jwt } from '../api/apiv2';
import {
  FormLayout,
  Title,
  Div,
  FormItem,
  Input,
  Checkbox,
  Link,
  Button,
  Tabs,
  TabsItem,
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import validator from 'validator';
import { Icon12EyeSlashOutline, Icon16View } from '@vkontakte/icons';

import { setLogged, setRememberMe } from '../store/allSlice';
import { setCurrentUser } from '../store/userSlice';
import { TUser } from '../types/types';

const Login: React.FC = () => {
  /// /// adds
  const [login, { isError, isLoading }] = useLoginMutation();
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

  const onSubmit = async () => {
    const user = await login({ role, email, password }).unwrap();
    const { token, ...rest } = user;
    jwt.set(token, isRememberMe);
    setCurrentUser(rest as TUser);
    setLogged(true);
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

  return (
    <FormLayout
      onSubmit={() => onSubmit()}
      style={{
        maxWidth: '300px',
        width: '100%',
        minHeight: '510px',
        border: 'none',
        boxSizing: 'border-box',
      }}>
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
        <TabsItem
          className='tabs-item'
          selected={role === 'user'}
          onClick={() => setRole('user')}>
          Сотрудник
        </TabsItem>
        <TabsItem
          className='tabs-item'
          selected={role === 'admin'}
          onClick={() => setRole('admin')}>
          Администратор
        </TabsItem>
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
        className={`form-item${isEmailValid ? '' : ' form-item_error'}`}>
        <Input
          id='email'
          type='email'
          placeholder='Email'
          name='email'
          value={email}
          onChange={onChange}
          className='input' />
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
        className={`form-item${isPasswordValid ? '' : ' form-item_error'}`}>
        <Input
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
          onChange={onChange}
          className='input' />
      </FormItem>
      <Div
        style={{
          padding: 0,
          marginBottom: '40px',
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
        <Button
          size='s'
          mode='link'
          className='reset-password-button'
          onClick={() => {
            navigate('/reset-password');
            resetForm();
          }}
          stretched>
          Сбросить пароль
        </Button>
      </Div>
      <FormItem style={{ padding: 0 }}>
        <Button
          size='l'
          style={{ background: '#3D87CD', borderRadius: '4px' }}
          disabled={isButtonDisabled}
          onClick={onSubmit}
          stretched>
          Войти
        </Button>
      </FormItem>
    </FormLayout>
  );
};

export default Login;
