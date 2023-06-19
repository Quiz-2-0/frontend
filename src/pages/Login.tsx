import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import {
  SplitLayout,
  SplitCol,
  FormLayout,
  FormItem,
  Input,
  Checkbox,
  Button,
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import { Icon12EyeSlashOutline } from '@vkontakte/icons';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.currentTarget;
    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);
  };

  return (
    <SplitLayout>
      <SplitCol style={{ maxWidth: 292 }}>
        <NavLink to='/'>Logo</NavLink>
        <FormLayout style={{ maxWidth: 410 }}>
          <FormItem htmlFor='email' top='Логин'>
            <Input
              id='email'
              type='email'
              placeholder='Введите рабочую почту'
              name='email'
              value={email}
              onChange={onChange} />
          </FormItem>

          <FormItem top='Пароль' htmlFor='pass'>
            <Input
              id='pass'
              type='password'
              placeholder='Введите пароль'
              name='password'
              value={password}
              after={<Icon12EyeSlashOutline />}
              onChange={onChange} />
          </FormItem>
          <Checkbox>Запомнить меня</Checkbox>
          <FormItem>
            <Button size='l' stretched>
              Войти
            </Button>
          </FormItem>
        </FormLayout>
      </SplitCol>
      <SplitCol />
    </SplitLayout>
  );
};

export default Login;
