/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable ternary/no-unreachable */
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
import StyledCheckbox from '../StyledCheckbox';
import { TableItem, TableTitle } from '../TableItems';
import { ArrowIcon } from '../icons';
import { IconWrapper } from './Achives';
import staff from '../../constants/staff';

const StyledExpandedItem = styled.div<{ isOpen: number[], id: any }>`
  max-height: ${({ isOpen, id }) => (!isOpen.includes(id) ? `${staff.length * 36}` : '0')};
  padding: 0;
  overflow: auto;
  position: relative;
  transition: all ease 0.7s;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const StaffLink = styled(StyledButton)`
  margin: 0;
  height: 24px;
  width: 24px;

  & > .vkuiButton__in {
    justify-content: flex-end;
  }
`;

const StyledDivWithCheckbox = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 12px;
  gap: 98px;

  &:hover {
    background: rgba(63, 138, 224, 0.05));
  }

  &:pressed {
    background: rgba(63, 138, 224, 0.15));
  }
`;

const StaffList: FC<{
  departments: { label: string; value: string }[],
}> = ({ departments }) => {
  const [isOpen, setIsOpen] = useState<number[]>([]);

  return (
    <StyledDiv style={{ maxHeight: '481px', height: '100%' }}>
      <FormItem style={{ padding: 0 }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '24px',
          }}>
          <StyledCheckbox>
            <TableTitle style={{ minWidth: '220px' }}>Сотрудники</TableTitle>
            <TableTitle style={{ minWidth: '220px' }}>Email</TableTitle>
            <TableTitle style={{ minWidth: '100px', textAlign: 'center' }}>
              Назначено
            </TableTitle>
            <TableTitle style={{ minWidth: '100px', textAlign: 'center' }}>
              Пройдено
            </TableTitle>
            <TableTitle style={{ minWidth: '100px', textAlign: 'center' }}>
              Рейтинг
            </TableTitle>
          </StyledCheckbox>
          <StyledButton
            onClick={() => setIsOpen(departments.map((dep, i) => i))}
            style={{ margin: '0 0 0 28px', height: '20px', minHeight: '20px' }}
            mode='link'>
            Свернуть всё
          </StyledButton>
        </div>
        <div style={{ height: '100%', overflowBlock: 'scroll' }}>
          {departments.slice(1).map((department, i) => (
            <>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  margin: '12px 0 0',
                  padding: '0 0 8px',
                  minHeight: '36px',
                  borderBottom: '1px solid #F2F3F5',
                }}>
                <StyledCheckbox style={{ maxHeight: '28px' }}>
                  <TableItem
                    style={{
                      fontSize: '16px',
                      fontWeight: '500',
                      lineHeight: '20px',
                      letterSpacing: '-0.32px',
                    }}>
                    {department.value}
                  </TableItem>
                </StyledCheckbox>
                <IconWrapper
                  onClick={() => (isOpen.includes(i)
                    ? setIsOpen(isOpen.filter((num) => num !== i))
                    : setIsOpen([...isOpen, i]))}>
                  <ArrowIcon
                    style={{
                      transform: `${!isOpen.includes(i) ? 'rotate(270deg)' : 'rotate(90deg)'}`,
                      transition: 'all .3s ease',
                    }} />
                </IconWrapper>
              </div>
              <StyledExpandedItem isOpen={isOpen} id={i}>
                {staff.map((user) => {
                  if (department.value === user.department) {
                    return (
                      <StyledDivWithCheckbox>
                        <StyledCheckbox>
                          <TableItem style={{ minWidth: '220px' }}>
                            {`${user.surname} ${user.firstname} ${user.patronymic}`}
                          </TableItem>
                          <TableItem style={{ minWidth: '220px' }}>
                            {user.email}
                          </TableItem>
                          <TableItem
                            style={{ minWidth: '100px', textAlign: 'center' }}>
                            {user.appounted}
                          </TableItem>
                          <TableItem
                            style={{ minWidth: '100px', textAlign: 'center' }}>
                            {user.passed}
                          </TableItem>
                          <TableItem
                            style={{ minWidth: '100px', textAlign: 'center' }}>
                            {user.raiting}
                          </TableItem>
                        </StyledCheckbox>
                        <StaffLink mode='link'>
                          <Icon24UserOutline />
                        </StaffLink>
                      </StyledDivWithCheckbox>
                    );
                  }
                })}
              </StyledExpandedItem>
            </>
          ))}
        </div>
      </FormItem>
    </StyledDiv>
  );
};

export default StaffList;
