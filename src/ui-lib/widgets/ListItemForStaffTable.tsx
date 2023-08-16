/* eslint-disable ternary/no-unreachable */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable ternary/nesting */
/* eslint-disable no-nested-ternary */
import React, { FC } from 'react';
import styled from 'styled-components';
import '@vkontakte/vkui/dist/vkui.css';
import { Icon24UserOutline } from '@vkontakte/icons';
import { IUser } from '@/types/types';
import StyledButton from '../styled-components/StyledButton';
import { TableItem } from '../styled-components/TableItems';
import StyledCheckbox from '../styled-components/StyledCheckbox';

const StyledDivWithCheckbox = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 12px;
  padding: 0 24px;
  gap: 98px;

  &:hover {
    background: rgba(63, 138, 224, 0.05);
  }

  &:pressed {
    background: rgba(63, 138, 224, 0.15);
  }
`;

const StaffLink = styled(StyledButton)`
  margin: 0;
  height: 24px;
  width: 24px;
  min-height: 24px;

  & > .vkuiButton__in {
    justify-content: flex-end;
  }
`;

const ListItemForStaffTable: FC<{
  user: IUser,
  userInd: number,
  depInd: number,
  topRef: React.RefObject<HTMLDivElement>,
  bottomRef: React.RefObject<HTMLDivElement>,
  staffList: IUser[] | undefined,
  departmentsNumber: number,
  isChecked: number[],
  setIsChecked: any,
}> = ({
  user,
  userInd,
  depInd,
  topRef,
  bottomRef,
  staffList,
  departmentsNumber,
  isChecked,
  setIsChecked,
}) => (
  <StyledDivWithCheckbox
    ref={depInd !== -1
      ? depInd === 0 && userInd === 0
        ? topRef
        : (depInd === departmentsNumber - 1) && (userInd === (staffList?.length ?? 0 - 1))
          ? bottomRef
          : null
      : userInd === 0
        ? topRef
        : (userInd === (staffList?.length ?? 0) - 1)
          ? bottomRef
          : null}>
    <StyledCheckbox
      checked={!!isChecked.includes(user.id)}
      onClick={() => (isChecked.includes(user.id)
        ? setIsChecked(isChecked.filter((num) => num !== user.id))
        : setIsChecked([...isChecked, user.id]))}>
      <TableItem
        style={{ minWidth: '220px' }}>
        {`${user.lastName} ${user.firstName} ${user.patronymic}`}
      </TableItem>
      <TableItem
        style={{ minWidth: '220px' }}>
        {user.email}
      </TableItem>
      <TableItem
        style={{ minWidth: '100px', textAlign: 'center' }}>
        {user.assigned || 0}
      </TableItem>
      <TableItem
        style={{ minWidth: '100px', textAlign: 'center' }}>
        {user.count_passed || 0}
      </TableItem>
      <TableItem
        style={{ minWidth: '100px', textAlign: 'center' }}>
        {user.rating || 0}
      </TableItem>
    </StyledCheckbox>
    <StaffLink mode='link'>
      <Icon24UserOutline />
    </StaffLink>
  </StyledDivWithCheckbox>
);

export default ListItemForStaffTable;
