import React, { FC, useState } from 'react';
import { Icon20ChevronRight } from '@vkontakte/icons';
import AddAnswersOnPage from './AddAnswersOnPage';
import StyledButton from '../styled-components/StyledButton';

const QuestionWithDragAndDrop: FC = () => {
  const [answers, setAnswers] = useState<string[]>([]);
  return (
    <>
      <AddAnswersOnPage
        title='Категории для соотношений'
        description='Создайте 2 или 3 категории, с которыми будут соотноситься ответы'
        placeholder='Введите название категории' />
      <AddAnswersOnPage
        title='Элементы для соотношения с категориями'
        description='Создайте элементы для соотношения с категориями'
        placeholder='Введите название элемента' />
      <StyledButton
        mode='link'
        style={{
          display: 'flex',
          gap: '8px',
          alignItems: 'center',
          marginTop: '22px',
        }}>
        Соотнесите элементы
        <Icon20ChevronRight />
      </StyledButton>
    </>
  );
};

export default QuestionWithDragAndDrop;
