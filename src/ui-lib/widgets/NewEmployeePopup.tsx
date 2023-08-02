/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable ternary/no-unreachable */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import React, { ChangeEvent, FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import {
  CustomSelect,
  FormLayout,
  IconButton,
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import { Icon24CancelOutline } from '@vkontakte/icons';
import Background from '../Background';
import StyledButton from '../StyledButton';
import StyledInput from '../StyledInput';
import StyledFormItem from '../StyledFormItem';

const StyledDiv = styled.div`
  max-width: 540px;
  width: 100%;
  max-height: 668px;
  min-height: min-content;
  padding: 48px 64px;
  box-sizing: border-box;
  background: white;
  border-radius: 16px;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.06),
    0px 4px 8px 0px rgba(0, 0, 0, 0.04);
`;

const NewEmployeePopup: FC<{
  isNewEmployeePopupOpen: boolean,
  setIsNewEmploeePopupOpen: any,
  type: any,
  setType: any,
  departments: { label: string; value: string }[],
}> = ({
  isNewEmployeePopupOpen,
  setIsNewEmploeePopupOpen,
  type,
  setType,
  departments,
}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState('');
  const [position, setPosition] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    if (name === 'full-name') {
      setFullName(value);
    }
    if (name === 'email') {
      setEmail(value);
    }
    if (name === 'department') {
      setDepartment(value);
    }
    if (name === 'position') {
      setPosition(value);
    }
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
            style={{
              width: '28px',
              height: '28px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onClick={() => setIsNewEmploeePopupOpen(false)}>
            <Icon24CancelOutline />
          </IconButton>
          <div
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              gap: '16px',
              margin: '8px 0 30px',
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
            style={{
              width: '100%',
              padding: '0',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '24px',
            }}>
            <StyledFormItem
              htmlFor='full-name'
              top='ФИО'>
              <StyledInput
                id='full-name'
                type='text'
                placeholder='Введите ФИО сотрудника'
                name='full-name'
                value={fullName}
                onChange={onChange} />
            </StyledFormItem>
            <StyledFormItem
              htmlFor='email'
              top='Email'>
              <StyledInput
                id='email'
                type='email'
                placeholder='Введите email'
                name='email'
                value={email}
                onChange={onChange} />
            </StyledFormItem>
            <StyledFormItem
              htmlFor='department'
              top='Отдел'>
              <CustomSelect
                selectType={type}
                options={departments}
                onChange={(e) => {
                  console.log(e);
                  setType(e.target.value);
                }} />
            </StyledFormItem>
            <StyledFormItem
              htmlFor='position'
              top='Должность'>
              <StyledInput
                id='position'
                type='text'
                placeholder='Введите должность'
                name='position'
                value={position}
                onChange={onChange} />
            </StyledFormItem>
            <StyledButton disabled={isDisabled} style={{ maxWidth: '198px', marginTop: '16px' }}>
              Добавить сотрудника
            </StyledButton>
          </FormLayout>
        </div>
      </StyledDiv>
    </Background>
  );
};

export default NewEmployeePopup;
