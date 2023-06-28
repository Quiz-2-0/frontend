import React from 'react';
import { useNavigate } from 'react-router';
import { Tabs, TabsItem } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import { Icon24HomeOutline, Icon24Square4Outline, Icon24CupOutline } from '@vkontakte/icons';
import styled from 'styled-components';

const StyledTabs = styled(Tabs)`
  margin-left: 80px;
  max-width: 166px;
  width: 100%;
  min-heigth: 168px;

  & > div {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
`;

const StyledTabsItem = styled(TabsItem)`
  padding: 0;
  heigth: 48px;
  display: flex;
  justify-content: left;

  &:selected {
    background: rgba(63, 138, 224, 0.05);
    border-rigth: 2.5px solid #3F8AE0;
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
  const navigate = useNavigate();
  return (
    <StyledTabs>
      <StyledTabsItem selected>
        <Icon24HomeOutline />
        Главная
      </StyledTabsItem>
      <StyledTabsItem>
        <Icon24Square4Outline />
        Квизы
      </StyledTabsItem>
      <StyledTabsItem>
        <Icon24CupOutline />
        Достижения
      </StyledTabsItem>
    </StyledTabs>
  );
};

export default Sidebar;