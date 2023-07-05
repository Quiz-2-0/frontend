/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React from 'react';
import { useLocation, useNavigate } from 'react-router';
import { Tabs, TabsItem } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import { Icon24HomeOutline, Icon24Square4Outline, Icon24CupOutline } from '@vkontakte/icons';
import styled from 'styled-components';
import { useDispatch } from '../../store/store.types';
import { setLoaderState } from '../../store/allSlice/allSlice';

const StyledTabs = styled(Tabs)`
  max-width: 166px;
  width: 100%;
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
  const dispatch = useDispatch();
  const setUrl = (url: string) => {
    dispatch(setLoaderState(true));
    navigate(url);
  };
  return (
    <StyledTabs>
      <StyledTabsItem selected={location.pathname === '/'} onClick={() => setUrl('/')}>
        <Icon24HomeOutline />
        Главная
      </StyledTabsItem>
      <StyledTabsItem selected={location.pathname === '/quizzes'} onClick={() => setUrl('/quizzes')}>
        <Icon24Square4Outline />
        Квизы
      </StyledTabsItem>
      <StyledTabsItem selected={location.pathname === '/achievements'} onClick={() => setUrl('/achievements')}>
        <Icon24CupOutline />
        Достижения
      </StyledTabsItem>
    </StyledTabs>
  );
};

export default Sidebar;
