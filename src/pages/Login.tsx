/* eslint-disable import/order */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable ternary/no-unreachable */
import React, { useState } from 'react';
import { useDispatch, useSelector } from '../store/store.types';
import { NavLink } from 'react-router-dom';
import {
  SplitLayout,
  SplitCol,
  FormLayout,
  Title,
  Group,
  Div,
  SegmentedControl,
  FormItem,
  Input,
  Checkbox,
  Link,
  Button,
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import validator from 'validator';
import { Icon12EyeSlashOutline, Icon16View } from '@vkontakte/icons';

import { setRememberMe } from '../store/allSlice';
import { fetchUserData } from '../store/userSlice';

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
  const changePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const resetForm = () => {
    setRole('user');
    setEmail('');
    setPassword('');
    dispatch(setRememberMe(!isRememberMe));
    setIsEmailValid(true);
    setIsPasswordValid(true);
    setIsPasswordVisible(false);
    setIsDisabled(true);
  };

  const onSubmit = () => {
    dispatch(fetchUserData({
      role,
      email,
      password,
    }));
    // сбрасываю форму, только если юзер залогинен!!!
    if (isLogged) {
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
    <SplitLayout>
      <SplitCol style={{ maxWidth: 292, margin: '72px 0 0 189px' }}>
        <NavLink className='logo' to='/'>
          Logo
        </NavLink>
        <FormLayout
          onSubmit={onSubmit}
          style={{
            maxWidth: '410px',
            width: '100%',
            minHeight: '510px',
            marginTop: '135px',
            padding: '32px',
            border: '1px solid #C1C7CD',
            borderRadius: '32px',
            boxSizing: 'border-box',
          }}>
          <Title
            level='1'
            style={{
              paddingBottom: '48px',
              fontWeight: 600,
              fontSize: '20px',
              lineHeight: '24px',
              textAlign: 'center',
              letterSpacing: '0.38px',
              color: '#21272A',
            }}>
            Вход в личный кабинет
          </Title>

          <Group style={{ padding: 0, marginBottom: '16px' }}>
            <Div style={{ padding: 0 }}>
              <SegmentedControl
                onChange={(value) => { value === 'user' ? setRole('user') : setRole('admin'); }}
                style={{ padding: 0 }}
                options={[
                  {
                    label: 'Сотрудник',
                    value: 'user',
                  },
                  {
                    label: 'Администратор',
                    value: 'admin',
                  },
                ]} />
            </Div>
          </Group>

          <FormItem
            htmlFor='email'
            top='Логин'
            onBlur={() => {
              setIsEmailValid(validator.isEmail(email));
              setIsDisabled(!(validator.isEmail(email) && password.length >= 6));
            }}
            onBeforeInput={() => setIsEmailValid(true)}
            status={isEmailValid ? 'default' : 'error'}
            bottom={isEmailValid ? '' : 'Неверный логин, попробуйте ещё раз'}
            className={`form-item${isEmailValid ? '' : ' form-item_error'}`}>
            <Input
              id='email'
              type='email'
              placeholder='Введите рабочую почту'
              name='email'
              value={email}
              onChange={onChange}
              className='input' />
          </FormItem>
          <FormItem
            top='Пароль'
            htmlFor='pass'
            onBeforeInput={() => setIsPasswordValid(true)}
            onBlur={() => {
              (password.length >= 6 ? setIsPasswordValid(true) : setIsPasswordValid(false));
              setIsDisabled(!(validator.isEmail(email) && password.length >= 6));
            }}
            status={isPasswordValid ? 'default' : 'error'}
            bottom={isPasswordValid ? '' : 'Введите пароль'}
            className={`form-item${isPasswordValid ? '' : ' form-item_error'}`}>
            <Input
              id='pass'
              type={isPasswordVisible ? 'text' : 'password'}
              placeholder='Введите пароль'
              name='password'
              value={password}
              after={
                isPasswordVisible ? (
                  <Icon12EyeSlashOutline
                    width={16}
                    height={16}
                    onClick={changePasswordVisibility} />
                ) : (
                  <Icon16View
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
              marginBottom: '16px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Checkbox
              className='text'
              checked={isRememberMe}
              style={{ padding: 0 }}
              onClick={() => {
                dispatch(setRememberMe(!isRememberMe));
              }}>
              Запомнить меня
            </Checkbox>
            <Link href='/reset-password' className='text'>
              Сбросить пароль
            </Link>
          </Div>
          <FormItem style={{ padding: 0 }}>
            <Button
              size='l'
              style={{ background: '#5181B8', borderRadius: '4px' }}
              disabled={isButtonDisabled}
              onClick={onSubmit}
              stretched>
              Войти
            </Button>
          </FormItem>
        </FormLayout>
      </SplitCol>
      <SplitCol style={{ background: '#5181B8' }} />
    </SplitLayout>
  );
};

export default Login;
