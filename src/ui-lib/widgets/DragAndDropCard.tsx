/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable ternary/no-unreachable */
/* eslint-disable object-shorthand */
import React from 'react';
import { useDrag } from 'react-dnd';
import styled from 'styled-components';
import { DnDCardProps } from '../../types/types';

const DnDCard = styled.div<{ backgroundColor: string, borderColor: string } >`
  width: 220px;
  padding: 16px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  border: ${({ borderColor }) => (`1px solid ${borderColor}`)};
  cursor: pointer;
  background-color: ${({ backgroundColor }) => (backgroundColor)};
  
  &:hover {
    border: 1px solid rgba(63, 138, 224, 0.15);
    background: rgba(63, 138, 224, 0.05);
  }
`;

const DnDCardText = styled.p`
  margin: 0;
  padding: 0;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  color: #000000;
  text-align: center;
`;

const DragAndDropCard: React.FC<DnDCardProps> = (
  {
    id,
    text,
    backgroundColor,
    borderColor,
  },
) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'item',
    item: { id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <DnDCard
      ref={drag}
      backgroundColor={backgroundColor}
      borderColor={borderColor}
      style={{
        opacity: isDragging ? '0.5' : '1',
      }}>
      <DnDCardText>{text}</DnDCardText>
    </DnDCard>
  );
};

export default DragAndDropCard;
