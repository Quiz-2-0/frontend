/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable ternary/nesting */
/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable ternary/no-unreachable */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import React, {
  FC,
  useState,
  useRef,
} from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Button, FormItem } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import { Icon24UserOutline, Icon20ChevronRight } from '@vkontakte/icons';
import StyledDiv from '../StyledDiv';
import StyledButton from '../StyledButton';
import StyledCheckbox from '../StyledCheckbox';
import { TableItem, TableTitle } from '../TableItems';
import { ArrowIcon } from '../icons';
import { IconWrapper } from './Achives';
import staff from '../../constants/staff';

const StyledExpandedItem = styled.div<{ isOpen: number[]; id: any }>`
  max-height: ${({ isOpen, id }) => (!isOpen.includes(id) ? `${staff.length * 36}px` : '0')};
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
  padding: 0 24px;
  gap: 98px;

  &:hover {
    background: rgba(63, 138, 224, 0.05));
  }

  &:pressed {
    background: rgba(63, 138, 224, 0.15));
  }
`;

const StyledBackAndForwardButton = styled(Button)`
  width: min-content;
  height: 24px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 15px;
  font-weight: 400;
  line-height: 20px;

  & > .vkuiButton__in > .vkuiButton__content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: no-wrap;
    width: 100%;
    gap: 8px;
  }
`;

const StaffList: FC<{
  departments: { label: string; value: string }[];
}> = ({ departments }) => {
  const [isOpen, setIsOpen] = useState<number[]>([]);
  const [isChecked, setIsChecked] = useState<number[]>([]);
  const topRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const scrollToTop = () => {
    setIsOpen([]);
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const scrollToBottom = () => {
    setIsOpen([]);
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <StyledDiv
        style={{ maxHeight: '481px', height: '100%', padding: '0 0 24px' }}>
        <FormItem
          style={{
            padding: 0,
            height: '100%',
            overflow: 'scroll',
            position: 'relative',
          }}>
          <div
            style={{
              padding: '24px 24px 12px',
              display: 'flex',
              background: '#fff',
              zIndex: '999',
              justifyContent: 'space-between',
              position: 'sticky',
              top: '0',
            }}>
            <StyledCheckbox
              checked={isChecked.length === staff.length}
              onClick={() => (
                isChecked.length === staff.length
                  ? setIsChecked([])
                  : setIsChecked(staff.map((emp, i) => i + 1))
              )}>
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
              onClick={() => (
                isOpen.length === departments.length - 1
                  ? setIsOpen([])
                  : setIsOpen(departments.slice(1).map((dep, i) => i))
              )}
              style={{ margin: '0 0 0 28px', height: '20px', minHeight: '20px' }}
              mode='link'>
              {isOpen.length === departments.length - 1
                ? 'Развернуть'
                : 'Свернуть всё'}
            </StyledButton>
          </div>
          <div style={{ height: '100%' }}>
            {departments.slice(1).map((department, i) => (
              <>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    margin: '12px 0 0',
                    padding: '0 24px 8px',
                    minHeight: '36px',
                    borderBottom: '1px solid #F2F3F5',
                  }}>
                  <StyledCheckbox
                    checked={
                      staff.filter((user) => (
                        department.value === user.department)).every(({ id }) => (
                        isChecked.includes(id)
                      ))
                    }
                    onClick={() => {
                      const users = staff.filter((user) => (
                        department.value === user.department)).map(({ id }) => id);
                      users.every((id) => isChecked.includes(id))
                        ? setIsChecked(isChecked.filter((num) => !users.includes(num)))
                        : setIsChecked(Array.from(new Set(isChecked.concat(users))));
                    }}
                    style={{ maxHeight: '28px' }}>
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
                    onClick={() => (
                      isOpen.includes(i)
                        ? setIsOpen(isOpen.filter((num) => num !== i))
                        : setIsOpen([...isOpen, i])
                    )}>
                    <ArrowIcon
                      style={{
                        transform: `${
                          !isOpen.includes(i) ? 'rotate(270deg)' : 'rotate(90deg)'
                        }`,
                        transition: 'all .3s ease',
                      }} />
                  </IconWrapper>
                </div>
                <StyledExpandedItem isOpen={isOpen} id={i}>
                  {staff.map((user) => {
                    if (department.value === user.department) {
                      return (
                        <StyledDivWithCheckbox
                          ref={
                            user.id === 0
                              ? topRef
                              : user.id === staff.length - 1
                                ? bottomRef
                                : null
                          }>
                          <StyledCheckbox
                            checked={!!isChecked.includes(user.id)}
                            onClick={() => (
                              isChecked.includes(user.id)
                                ? setIsChecked(isChecked.filter((num) => num !== user.id))
                                : setIsChecked([...isChecked, user.id])
                            )}>
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
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          gap: '16px',
          marginTop: '14px',
        }}>
        <StyledBackAndForwardButton
          onClick={scrollToTop}
          aria-label='В начало'
          mode='link'>
          <Icon20ChevronRight style={{ transform: 'rotate(180deg)' }} />
          В начало
        </StyledBackAndForwardButton>
        <StyledBackAndForwardButton
          onClick={scrollToBottom}
          aria-label='В конец'
          mode='link'>
          В конец
          <Icon20ChevronRight />
        </StyledBackAndForwardButton>
      </div>
    </>
  );
};

export default StaffList;