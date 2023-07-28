/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import React, { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Button, Checkbox, FormItem } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import { Icon24UserOutline } from '@vkontakte/icons';
import StyledDiv from '../StyledDiv';
import StyledButton from '../StyledButton';
import { ArrowIcon } from '../icons';
import { IconWrapper } from './Achives';

const StyledCheckbox = styled(Checkbox)`
  min-height: 24px;
  margin: 0 !important;
  padding: 0;

  & > .vkuiCheckbox__icon {
    margin-right: 24px;
  }

  & > .vkuiCheckbox__content > .vkuiCheckbox__title {
    margin: 0;
  }

  & > .vkuiCheckbox__content > .vkuiCheckbox__title > span {
    margin: 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 24px;
  }
`;

const DepartmentCheckbox = styled(StyledCheckbox)`
  margin-top: 24px;
  min-height: 36px;
  border-bottom: 1px solid #F2F3F5;
`;

const TableTitle = styled.p`
  margin: 0;
  display: block;
  width: 100%;
  color: #818C99;
  font-size: 16px;
  line-height: 20px;
  letter-spacing: -0.32px;
`;

const TableItem = styled(TableTitle)`
  color: #000;
`;

const StaffLink = styled(StyledButton)`
  margin: 0;
  height: 20px;
  min-height: 20px;
  min-width: 118px;

  & > .vkuiButton__in {
    justify-content: flex-end;
  }
`;

const StaffList: FC = () => {
  const [isOpen, open] = useState(false);
  return (
    <StyledDiv>
      <FormItem style={{ padding: 0 }}>
        <StyledCheckbox>
          <TableTitle style={{ minWidth: '220px' }}>Сотрудники</TableTitle>
          <TableTitle style={{ minWidth: '220px' }}>Email</TableTitle>
          <TableTitle style={{ minWidth: '100px', textAlign: 'center' }}>Назначено</TableTitle>
          <TableTitle style={{ minWidth: '100px', textAlign: 'center' }}>Пройдено</TableTitle>
          <TableTitle style={{ minWidth: '100px', textAlign: 'center' }}>Рейтинг</TableTitle>
          <StyledButton style={{ margin: '0 0 0 28px', height: '20px', minHeight: '20px' }} mode='link'>Свернуть всё</StyledButton>
        </StyledCheckbox>
        <DepartmentCheckbox>
          <TableItem>Маркетинг</TableItem>
          <IconWrapper onClick={() => open(!isOpen)}>
            <ArrowIcon style={{ transform: `${isOpen ? 'rotate(270deg)' : 'rotate(90deg)'}`, transition: 'all .3s ease' }} />
          </IconWrapper>
        </DepartmentCheckbox>
        <StyledCheckbox>
          <TableItem style={{ minWidth: '220px' }}>Иванов Иван Иванович</TableItem>
          <TableItem style={{ minWidth: '220px' }}>ivan.iivanov@company.com</TableItem>
          <TableItem style={{ minWidth: '100px', textAlign: 'center' }}>21</TableItem>
          <TableItem style={{ minWidth: '100px', textAlign: 'center' }}>21</TableItem>
          <TableItem style={{ minWidth: '100px', textAlign: 'center' }}>21</TableItem>
          <StaffLink mode='link'>
            <Icon24UserOutline />
          </StaffLink>
        </StyledCheckbox>
      </FormItem>
    </StyledDiv>
  );
};

export default StaffList;
