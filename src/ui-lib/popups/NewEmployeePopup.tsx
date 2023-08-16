/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable ternary/no-unreachable */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import React, {
  ChangeEvent,
  FC,
  useState,
  useEffect,
} from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import validator from 'validator';
import {
  Select,
  FormLayout,
  IconButton,
  FormLayoutGroup,
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import { Icon24CancelOutline } from '@vkontakte/icons';
import Background from '../styled-components/Background';
import StyledButton from '../styled-components/StyledButton';
import StyledInput from '../styled-components/StyledInput';
import StyledFormItem from '../styled-components/StyledFormItem';
import { useCreateUserMutation } from '@/api/apiv2';

const StyledDiv = styled.div`
  max-width: 1000px;
  width: 100%;
  height: 556px;
  padding: 48px 48px 52px;
  box-sizing: border-box;
  background: white;
  border-radius: 16px;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.06),
    0 4px 8px 0 rgba(0, 0, 0, 0.04);
`;

const StyledSelect = styled(Select)`
  & > .vkuiSelect {
    min-height: 40px;
  }
`;

const StyledFormLayoutGroup = styled(FormLayoutGroup)`
  padding: 0;

  & > div:last-of-type {
    margin-left: 48px !important;
  }
`;

const FormItemForNewEmployee = styled(StyledFormItem)`
  & > .vkuiFormItem__top {
    color: #6F7985;
  }
`;

const NewEmployeePopup: FC<{
  isNewEmployeePopupOpen: boolean,
  setIsNewEmploeePopupOpen: any,
  departments: { label: string; value: number }[] | undefined,
}> = ({
  isNewEmployeePopupOpen,
  setIsNewEmploeePopupOpen,
  departments,
}) => {
  const [createUser, result] = useCreateUserMutation();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [patronymic, setPatronymic] = useState('');
  const [isFirstNameValid, setIsFirstNameValid] = useState(true);
  const [isLastNameValid, setIsLastNameValid] = useState(true);
  const [isPatronymicValid, setIsPatronymicValid] = useState(true);
  const [email, setEmail] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [department, setDepartment] = useState(-1);
  const [isDepartmentValid, setIsDepartmentValid] = useState(true);
  const [position, setPosition] = useState('');
  const [isPositionValid, setIsPositionValid] = useState(true);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    setIsActive(
      isFirstNameValid && isLastNameValid && isPatronymicValid &&
      isEmailValid && isDepartmentValid && isPositionValid &&
      firstName !== '' && lastName !== '' && patronymic !== '' &&
      email !== '' && department !== -1 && position !== '',
    );
  }, [firstName, lastName, patronymic, email, department, position]);

  const resetForm = () => {
    setFirstName('');
    setLastName('');
    setPatronymic('');
    setEmail('');
    setDepartment(-1);
    setPosition('');
    setIsFirstNameValid(true);
    setIsLastNameValid(true);
    setIsPatronymicValid(true);
    setIsEmailValid(true);
    setIsDepartmentValid(true);
    setIsPositionValid(true);
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    [{ text: 'first-name', method: setFirstName },
      { text: 'last-name', method: setLastName },
      { text: 'patronymic', method: setPatronymic },
      { text: 'email', method: setEmail },
      { text: 'position', method: setPosition }].map(({ text, method }) => {
      if (name === text) {
        method(value);
      }
    });
  };

  const onSubmit = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    await createUser({
      firstName,
      lastName,
      position,
      patronymic,
      department,
      email,
      role: 'EMP',
    });
    resetForm();
    setIsNewEmploeePopupOpen(false);
  };

  return (
    <Background
      style={{
        visibility: `${isNewEmployeePopupOpen ? 'visible' : 'hidden'}`,
        opacity: `${isNewEmployeePopupOpen ? '1' : '0'}`,
      }}>
      <StyledDiv>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
          }}>
          <IconButton
            aria-label='Закрыть'
            style={{
              width: '28px',
              height: '28px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onClick={() => {
              setIsNewEmploeePopupOpen(false);
              resetForm();
            }}>
            <Icon24CancelOutline fill='#3F8AE0' />
          </IconButton>
          <div
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              gap: '16px',
              margin: '8px 0 28px',
            }}>
            <h2
              style={{
                margin: 0,
                fontSize: '20px',
                fontWeight: '600',
                lineHeight: '24px',
                letterSpacing: '0.38px',
              }}>
              Добавление нового сотрудника
            </h2>
            <p
              style={{
                margin: 0,
                fontSize: '15px',
                fontWeight: '400',
                lineHeight: '20px',
              }}>
              После добавления нового сотрудника, на указанную почту ему придет
              сгенерированный пароль.
            </p>
          </div>
          <FormLayout
            onSubmit={onSubmit}
            style={{
              width: '100%',
              padding: '0',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}>
            <StyledFormLayoutGroup mode='horizontal'>
              <FormItemForNewEmployee
                htmlFor='last-name'
                top='Фамилия'
                onBlur={() => {
                  const regex = /^[А-ЯЁA-Z][а-яёa-z'-]+$/;
                  setIsLastNameValid(regex.test(lastName));
                }}
                onChange={() => setIsLastNameValid(true)}
                status={isLastNameValid ? 'default' : 'error'}
                bottom={isLastNameValid ? '' : 'Неверно введена фамилия'}
                style={{ paddingBottom: `${isLastNameValid ? '24px' : '0px'}` }}>
                <StyledInput
                  id='last-name'
                  type='text'
                  placeholder='Введите Фамилию'
                  name='last-name'
                  value={lastName}
                  onChange={onChange} />
              </FormItemForNewEmployee>
              <FormItemForNewEmployee
                htmlFor='email'
                top='Email'
                onBlur={() => {
                  setIsEmailValid(validator.isEmail(email));
                }}
                onChange={() => setIsEmailValid(true)}
                status={isEmailValid ? 'default' : 'error'}
                bottom={isEmailValid ? '' : 'Неверно введён email'}
                style={{ paddingBottom: `${isEmailValid ? '24px' : '0px'}` }}>
                <StyledInput
                  id='email'
                  type='email'
                  placeholder='Введите email'
                  name='email'
                  value={email}
                  onChange={onChange} />
              </FormItemForNewEmployee>
            </StyledFormLayoutGroup>
            <StyledFormLayoutGroup mode='horizontal'>
              <FormItemForNewEmployee
                htmlFor='first-name'
                top='Имя'
                onBlur={() => {
                  const regex = /^[А-ЯЁA-Z][а-яёa-z]+(-[А-ЯЁA-Z][а-яёa-z]+)?$/;
                  setIsFirstNameValid(regex.test(firstName));
                }}
                onChange={() => setIsFirstNameValid(true)}
                status={isFirstNameValid ? 'default' : 'error'}
                bottom={isFirstNameValid ? '' : 'Неверно введено имя'}
                style={{ paddingBottom: `${isFirstNameValid ? '24px' : '0px'}` }}>
                <StyledInput
                  id='first-name'
                  type='text'
                  placeholder='Введите Имя'
                  name='first-name'
                  value={firstName}
                  onChange={onChange} />
              </FormItemForNewEmployee>
              <FormItemForNewEmployee
                htmlFor='department'
                top='Отдел'
                onBlur={() => {
                  setIsDepartmentValid(department !== -1);
                }}
                onChange={() => setIsFirstNameValid(true)}
                status={isDepartmentValid ? 'default' : 'error'}
                bottom={isDepartmentValid ? '' : 'Отдел не выбран'}
                style={{ paddingBottom: `${isDepartmentValid ? '24px' : '0px'}` }}>
                <StyledSelect
                  placeholder='Выберите отдел'
                  value={department}
                  onChange={(e) => setDepartment(Number(e.target.value))}
                  options={departments ?? []} />
              </FormItemForNewEmployee>
            </StyledFormLayoutGroup>
            <StyledFormLayoutGroup mode='horizontal'>
              <FormItemForNewEmployee
                htmlFor='patronymic'
                top='Отчество'
                onBlur={() => {
                  const regex = /^[А-ЯЁA-Z][а-яёa-z]+(-[А-ЯЁA-Z][а-яёa-z]+)?$/;
                  setIsPatronymicValid(regex.test(patronymic));
                }}
                onChange={() => setIsPatronymicValid(true)}
                status={isPatronymicValid ? 'default' : 'error'}
                bottom={isPatronymicValid ? '' : 'Неверно введено отчество'}
                style={{ paddingBottom: `${isPatronymicValid ? '24px' : '0px'}` }}>
                <StyledInput
                  id='patronymic'
                  type='text'
                  placeholder='Введите Отчество'
                  name='patronymic'
                  value={patronymic}
                  onChange={onChange} />
              </FormItemForNewEmployee>
              <FormItemForNewEmployee
                htmlFor='position'
                top='Должность'
                onBlur={() => {
                  const regex = /^[А-ЯЁA-Z][а-яёa-z\s-]+$/;
                  setIsPositionValid(regex.test(position));
                }}
                onChange={() => setIsPositionValid(true)}
                status={isPositionValid ? 'default' : 'error'}
                bottom={isPositionValid ? '' : 'Неверно введена должность'}
                style={{ paddingBottom: `${isPositionValid ? '24px' : '0px'}` }}>
                <StyledInput
                  id='position'
                  type='text'
                  placeholder='Введите должность'
                  name='position'
                  value={position}
                  onChange={onChange} />
              </FormItemForNewEmployee>
            </StyledFormLayoutGroup>
            <StyledButton
              type='submit'
              disabled={!isActive}
              style={{ maxWidth: '198px', marginTop: '16px' }}>
              Добавить сотрудника
            </StyledButton>
          </FormLayout>
        </div>
      </StyledDiv>
    </Background>
  );
};

export default NewEmployeePopup;
