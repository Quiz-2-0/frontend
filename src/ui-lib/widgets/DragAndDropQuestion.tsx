/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React, { FC, useState } from 'react';
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
/*
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
]; */

const DragAndDropQuestion: FC<{
  boardTitles: { id: number, text: string, items: Item[] }[],
  answers: { id: number, text: string }[],
}> = ({ boardTitles, answers }) => {
  const [boards, setBoards] = useState<{ id: number, text: string, items: Item[] }[]>(boardTitles);
  const [cards, setCards] = useState<Item[]>(answers);

  const addItemToBoard = (id: number, boardId: number) => {
    console.log(cards.filter((card) => card.id !== id));
    setCards((prevCards) => prevCards.filter((card) => card.id !== id));
    const filteredItem = answers.find((item) => id === item.id);
    filteredItem && setBoards((currentBoard) => currentBoard.map((board) => (
      boardId === board.id && !board.items.includes(filteredItem)
        ? { ...board, items: [...board.items, filteredItem] }
        : { ...board, items: board.items.filter((item) => item !== filteredItem) }
    )));
  };

  return (
    <div>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '16px',
      }}>
        {boardTitles.map(({ text, id }) => (
          <DragAndDropBoard
            key={id}
            title={text}
            board={boards[id].items}
            onItemMove={(e) => addItemToBoard(e, id)} />
        ))}
      </div>
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
