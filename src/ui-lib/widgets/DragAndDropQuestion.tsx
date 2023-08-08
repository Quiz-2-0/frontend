/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React, { useState } from 'react';
import styled from 'styled-components';
import DragAndDropBoard from './DragAndDropBoard';
import DragAndDropCard from './DragAndDropCard';
import { Item } from '@/types/types';

const DnDItemsContainer = styled.div`
  margin-top: 20px;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  gap: 16px;
  flex-wrap: wrap;
  display: flex;
`;

const items = [
  {
    id: 1,
    text: 'Георгий Трубачёв',
  },
  {
    id: 2,
    text: 'Мария Архипова',
  },
  {
    id: 3,
    text: 'Тарон Акопян',
  },
  {
    id: 4,
    text: 'Илья Иванов',
  },
  {
    id: 5,
    text: 'Виталий Ермолов',
  },
  {
    id: 6,
    text: 'Тамара Французова',
  },
];

const DragAndDropQuestion = () => {
  const [board, setBoard] = useState<Item[]>([]);
  const [cards, setCards] = useState<Item[]>(items);

  const addItemToBoard = (id: number) => {
    setCards((prevCards) => prevCards.filter((card) => card.id !== id));
    const filteredItems = items.filter((item) => id === item.id);
    setBoard((currentBoard) => [...currentBoard, filteredItems[0]]);
  };

  return (
    <div>
      <DragAndDropBoard title='Название доски' board={board} onItemMove={addItemToBoard} />
      <DnDItemsContainer style={{ display: cards.length === 0 ? 'none' : 'flex' }}>
        {cards.map((item) => (
          <DragAndDropCard
            key={item.id}
            id={item.id}
            text={item.text}
            backgroundColor='transparent'
            borderColor='#DCE1E6' />
        ))}
      </DnDItemsContainer>
    </div>
  );
};

export default DragAndDropQuestion;
