import React from 'react';
import { useLocation, useNavigate } from 'react-router';
import { Tabs, TabsItem } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import {
  Icon24HomeOutline,
  Icon24Square4Outline,
  Icon24CupOutline,
  Icon24UsersOutline,
  Icon24DocumentPlusOutline,
  Icon24PollOutline,
} from '@vkontakte/icons';
import styled from 'styled-components';

const StyledTabs = styled(Tabs)`
  min-width: 166px;
  min-height: 168px;

  & > div {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  & > div > .vkuiTabsItem--selected {
    background-color: rgba(63, 138, 224, 0.05);
    border-radius: 0;
    border-right: 2.5px solid #3F8AE0;
  }

  & > div > .vkuiTabsItem--selected:hover {
    background: rgba(63, 138, 224, 0.15);
  }
`;

const StyledTabsItem = styled(TabsItem)`
  padding: 12px 12px;
  box-sizing: border-box;
  heigth: 48px;
  display: flex;
  justify-content: left;
  border-radius: 0;

  &:hover {
    background: rgba(63, 138, 224, 0.15);
  }

  & > div {
    display: none;
  }

  & > span {
    display: flex;
    gap: 8px;
    font-size: 16px;
    line-height: 20px;
    letter-spacing: -0.32px;
    color: #000;
  }

  & > span > svg {
    color: #3F8AE0;
  }
`;

const Sidebar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const localStorageRole = localStorage.getItem('role') ?? '';
  const sessionStorageRole = sessionStorage.getItem('role') ?? '';
  const userRole = (localStorageRole !== '') ? localStorageRole : sessionStorageRole;
  const setUrl = (url: string) => {
    navigate(url);
  };
  return (
    <StyledTabs>
      {userRole !== 'AD' ? (
        <>
          <StyledTabsItem selected={location.pathname === '/'} onClick={() => setUrl('/')}>
            <Icon24HomeOutline />
            Главная
          </StyledTabsItem>
          <StyledTabsItem selected={location.pathname.includes('/quizzes')} onClick={() => setUrl('/quizzes')}>
            <Icon24Square4Outline />
            Квизы
          </StyledTabsItem>
          <StyledTabsItem selected={location.pathname === '/achievements'} onClick={() => setUrl('/achievements')}>
            <Icon24CupOutline />
            Достижения
          </StyledTabsItem>
        </>
      ) : (
        <>
          <StyledTabsItem selected={location.pathname === '/staff'} onClick={() => setUrl('/staff')}>
            <Icon24UsersOutline />
            Сотрудники
          </StyledTabsItem>
          <StyledTabsItem selected={location.pathname.includes('/adm-quizzes')} onClick={() => setUrl('/adm-quizzes')}>
            <Icon24Square4Outline />
            Квизы
          </StyledTabsItem>
          <StyledTabsItem selected={location.pathname.includes('/new-quiz')} onClick={() => setUrl('/new-quiz')}>
            <Icon24DocumentPlusOutline />
            Новый квиз
          </StyledTabsItem>
          <StyledTabsItem selected={location.pathname === '/analytics'} onClick={() => setUrl('/analytics')}>
            <Icon24PollOutline />
            Аналитика
          </StyledTabsItem>
        </>
      )}
    </StyledTabs>
  );
};

export default Sidebar;
