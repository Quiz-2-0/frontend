import React, { FC, useState } from 'react';
import styled from 'styled-components';
import {
  Tabs,
  TabsItem,
  Search,
  Badge,
} from '@vkontakte/vkui';
import Dropdown from '../Dropdown';
import { StyledTabs, StyledTabsItem } from './QuizMenu';

const mockArray = [{ name: 'jfvjvjrnvjn', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris pretium eros non convallis aliquet. Curabitur egestas mi et tortor lacinia, quis auctor ligula convallis. Nunc sem enim, placerat ac porta eu, lacinia vitae velit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Cras lobortis a eros vitae luctus. Integer dictum ultricies diam.Cras maximus id leo at ultricies. Fusce scelerisque pharetra vulputate. Phasellus fermentum sem in est blandit pharetra vel at orci. Nunc commodo vestibulum elit, nec varius neque efficitur at. Vivamus ut justo consectetur, faucibus purus ut, mattis enim. Aliquam turpis velit, fermentum sed ex ut, laoreet molestie neque. Maecenas luctus nisl elit, ac sollicitudin metus dictum in. Pellentesque efficitur rutrum tellus, vitae posuere ipsum interdum vel. Vivamus nibh dui, cursus id tortor ac, aliquam dapibus metus. Curabitur metus massa, tincidunt a lacinia eget, convallis in sapien. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. In ut imperdiet neque. Ut egestas at libero at sollicitudin. Aliquam pulvinar leo et ultrices iaculis.' }, { name: 'jfvjvjrnvjn', description: 'uhvn4885urdndfrjnewj39493494' }];

const Div = styled.div`
    display: flex;
    flex-direction: column;
    gap: 6px;
    max-width: 1074px;
    width: 100%;
`;

const List = styled.ul`
    display: flex;
    flex-direction: column;
    width: 100%;
    list-style: none;
    padding: 0;
    margin: 0;
`;

const ListForQuiz: FC = () => {
  const [listType, setListType] = useState('about');
  const quizTypeFilter = (type: string) => {
    setListType(type);
  };
  return (
    <Div>
      <StyledTabs>
        <StyledTabsItem selected={listType === 'about'} onClick={() => quizTypeFilter('about')}>
          Справочные материалы
        </StyledTabsItem>

        <StyledTabsItem selected={listType === 'analitics'} onClick={() => quizTypeFilter('analitics')}>
          Анализ ошибок
        </StyledTabsItem>
      </StyledTabs>
      <List>
        {mockArray.map((el) => (
          <Dropdown name={el.name} description={el.description} />
        ))}
      </List>
    </Div>
  );
};

export default ListForQuiz;
