/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import React from 'react';
import { useDrop } from 'react-dnd';
import styled from 'styled-components';
import {
  Headline,
} from '@vkontakte/vkui';
import DragAndDropCard from './DragAndDropCard';
import { Item, BoardProps } from '@/types/types';

const DnDBoard = styled.div`
  width: 100%;
  min-height: 230px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;
  border-radius: 8px;
  background: rgba(63, 138, 224, 0.05);
  box-sizing: border-box;
  padding-bottom: 8px;
`;

const DragAndDropBoard: React.FC<BoardProps> = ({ title, board, onItemMove }) => {
  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: 'item',
      drop: (item: Item) => onItemMove(item.id),
      collect: (monitor) => ({
        isOver: monitor.isOver(),
      }),
    }),
    [onItemMove],
  );

  return (
    <DnDBoard ref={drop}>
      <Headline weight='2' style={{ padding: '8px' }}>{title}</Headline>
      {board.map((item) => (
        <DragAndDropCard
          key={item.id}
          id={item.id}
          text={item.text}
          backgroundColor='rgba(63, 138, 224, 0.15)'
          borderColor='#3F8AE0' />
      ))}
    </DnDBoard>
  );
};

export default DragAndDropBoard;
