/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, {
  FC,
  useState,
  useRef,
} from 'react';
import styled from 'styled-components';
import { FormItem } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import { Icon20ChevronRight } from '@vkontakte/icons';
import StyledDiv from '../styled-components/StyledDiv';
import StyledButton from '../styled-components/StyledButton';
import StyledCheckbox from '../styled-components/StyledCheckbox';
import StyledBackAndForwardButton from '../styled-components/StyledBackAndForwardButton';
import { TableItem, TableTitle } from '../styled-components/TableItems';
import { ArrowIcon } from '../styled-components/icons';
import { IconWrapper } from './Achieves';
import { IUser } from '@/types/types';
import ListItemForStaffTable from './ListItemForStaffTable';

const StyledExpandedItem = styled.div<{ isOpen: number[]; index: number; staffList: IUser[] | undefined }>`
  height: ${({ isOpen, index }) => (!isOpen.includes(index) ? 'min-content' : '0')};
  min-height: ${({ isOpen, index, staffList }) => (!isOpen.includes(index) ? `${(staffList?.length ?? 0) * 36}px` : '0')};
  overflow: hidden;
  padding: 0;
  position: relative;
  transition: all 0.7s ease;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const StaffList: FC<{
  departments: { label: string; value: number }[] | undefined,
  staffList: IUser[] | undefined,
  isChecked: number[],
  setIsChecked: any,
  search: string,
}> = ({
  departments,
  staffList,
  search,
  isChecked,
  setIsChecked,
}) => {
  const [isOpen, setIsOpen] = useState<number[]>([]);

  const topRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const scrollToTop = () => {
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToBottom = () => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <StyledDiv
        style={{ height: '481px', padding: '0 0 24px' }}>
        <FormItem
          style={{
            padding: 0,
            position: 'relative',
          }}>
          <div
            style={{
              padding: '24px 24px 12px',
              display: 'flex',
              background: '#fff',
              zIndex: '1',
              gap: `${departments?.length !== 1 ? '0' : '98px'}`,
              justifyContent: 'space-between',
              position: 'sticky',
              top: '0',
            }}>
            <StyledCheckbox
              checked={isChecked.length === staffList?.length && staffList.length !== 0}
              onClick={() => (
                isChecked.length === staffList?.length
                  ? setIsChecked([])
                  : setIsChecked(staffList?.map(({ id }) => id))
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
            {(departments?.length ?? 0) > 1
              ? (
                <StyledButton
                  onClick={() => {
                    isOpen.length === (departments?.length ?? 0)
                      ? setIsOpen([])
                      : setIsOpen(departments?.map(({ value }) => value) ?? []);
                  }}
                  style={{ margin: '0 0 0 28px', height: '20px', minHeight: '20px' }}
                  mode='link'>
                  {isOpen.length === (departments?.length ?? 0)
                    ? 'Развернуть'
                    : 'Свернуть всё'}
                </StyledButton>
              ) : (
                <div style={{ margin: '0 0 0 28px', height: '20px', minHeight: '20px' }} />
              )}
          </div>
          <div style={{ height: '397px', overflow: 'scroll', zIndex: '-1000' }}>
            {departments?.length === 1 || search !== ''
              ? (
                staffList?.length === 0
                  ? (
                    <p
                      style={{
                        fontSize: '16px',
                        color: '#818C99',
                        paddingLeft: '72px',
                      }}>
                      По вашему запросу ничего не найдено
                    </p>
                  ) : (
                    staffList?.map((user, i) => (
                      <ListItemForStaffTable
                        key={user.id}
                        user={user}
                        userInd={i}
                        depInd={-1}
                        topRef={topRef}
                        bottomRef={bottomRef}
                        staffList={staffList}
                        isChecked={isChecked}
                        setIsChecked={setIsChecked} />
                    )))) : (
                departments?.map((department, i) => (
                  <>
                    <div
                      key={department.value}
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
                          staffList?.filter((user) => (
                            department.label === user.department)).every(({ id }) => (
                            isChecked.includes(id)
                          ))
                        }
                        onClick={() => {
                          const users = staffList?.filter((user) => (
                            department.label === user.department)).map(({ id }) => id);
                          users?.every((id) => isChecked.includes(id))
                            ? setIsChecked(isChecked.filter((num) => !users?.includes(num)))
                            : setIsChecked(Array.from(new Set(isChecked.concat(users ?? []))));
                        }}
                        style={{ maxHeight: '28px' }}>
                        <TableItem
                          style={{
                            fontSize: '16px',
                            fontWeight: '500',
                            lineHeight: '20px',
                            letterSpacing: '-0.32px',
                          }}>
                          {department.label}
                        </TableItem>
                      </StyledCheckbox>
                      <IconWrapper
                        onClick={() => (
                          isOpen.includes(department.value)
                            ? setIsOpen(isOpen.filter((num) => num !== department.value))
                            : setIsOpen([...isOpen, department.value])
                        )}>
                        <ArrowIcon
                          style={{
                            transform: `${
                              !isOpen.includes(department.value) ? 'rotate(270deg)' : 'rotate(90deg)'
                            }`,
                            transition: 'all .3s ease',
                          }} />
                      </IconWrapper>
                    </div>
                    <StyledExpandedItem
                      isOpen={isOpen}
                      index={department.value}
                      staffList={staffList?.filter((user) => (
                        department.label === user.department
                      ))}>
                      {staffList?.filter((user) => (
                        department.label === user.department
                      )).map((user, ind) => (
                        <ListItemForStaffTable
                          key={user.id}
                          user={user}
                          userInd={ind}
                          depInd={i}
                          topRef={topRef}
                          bottomRef={bottomRef}
                          staffList={staffList}
                          isChecked={isChecked}
                          setIsChecked={setIsChecked} />
                      ))}
                    </StyledExpandedItem>
                  </>
                ))
              )}
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
          visibility: `${
            ((staffList?.length ?? 0) * 36 >= 360 && isOpen.length < (departments?.length ?? 0))
            || ((departments?.length ?? 0) * 44 >= 360 && isOpen.length !== 0) ? 'visible' : 'hidden'}`,
          opacity: `${
            ((staffList?.length ?? 0) * 36 >= 360 && isOpen.length < (departments?.length ?? 0))
            || ((departments?.length ?? 0) * 44 >= 360 && isOpen.length === (departments?.length ?? 0)) ? '1' : '0'}`,
          transition: 'all 1 ease',
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
