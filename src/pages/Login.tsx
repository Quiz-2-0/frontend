/* eslint-disable ternary/no-unreachable */
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
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
  Button,
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import { Icon12EyeSlashOutline, Icon16View } from '@vkontakte/icons';
import '../ui-lib/logo/logo.css';
import '../ui-lib/input/input.css';
import '../ui-lib/text/text.css';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const changePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  console.log(errors);

  type FormValues = {
    email: string;
    password: string;
  };

  const onSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    console.log(e.target.value);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);
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

          <Group style={{ padding: 0, marginBottom: '32px' }}>
            <Div style={{ padding: 0 }}>
              <SegmentedControl
                style={{ padding: 0, background: 'none', border: 'none' }}
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
            style={{
              padding: 0,
              marginBottom: '16px',
              fontWeight: 400,
              fontSize: '14px',
              lineHeight: '140%',
              color: '#21272A',
            }}>
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
            style={{ padding: 0, marginBottom: '16px' }}>
            <Input
              id='pass'
              type={isPasswordVisible ? 'text' : 'password'}
              placeholder='Введите пароль'
              name='password'
              value={password}
              after={
                isPasswordVisible ? (
                  <Icon16View
                    width={24}
                    height={24}
                    onClick={changePasswordVisibility} />
                ) : (
                  <Icon12EyeSlashOutline
                    width={24}
                    height={24}
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
            <Checkbox className='text'>Запомнить меня</Checkbox>
            <NavLink to='/reset-password' className='text'>
              Сбросить пароль
            </NavLink>
          </Div>
          <FormItem style={{ padding: 0 }}>
            <Button
              size='l'
              style={{ background: '#5181B8', borderRadius: '4px' }}
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
