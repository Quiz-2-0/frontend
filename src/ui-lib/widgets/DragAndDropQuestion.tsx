/* eslint-disable @typescript-eslint/no-unsafe-call */
import React, { FC, useState, useEffect } from 'react';
import styled from 'styled-components';
import DragAndDropBoard from './DragAndDropBoard';
import DragAndDropCard from './DragAndDropCard';
import { DragAndDropQuestionProps, Item } from '@/types/types';

const DnDItemsContainer = styled.div`
  margin-top: 20px;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  gap: 16px;
  flex-wrap: wrap;
  display: flex;
`;

const DragAndDropQuestion: FC<DragAndDropQuestionProps> = (
  {
    question,
    questionsList,
    setQuestionsList,
    boardTitles,
    answersList,
    selectListAnswers,
  },
) => {
  const [boards, setBoards] = useState<{ id: number, text: string, items: Item[] }[]>(boardTitles);
  const [cards, setCards] = useState<Item[]>(answersList);
  useEffect(() => {
    setBoards(boardTitles);
    setCards(answersList);
  }, [boardTitles, answersList]);

  const addItemToBoard = (id: number, boardId: number) => {
    let b = boards;
    const c = cards.filter((card) => card.id !== id);
    const filteredItem = answersList.find((item) => id === item.id);
    if (filteredItem) {
      b = boards.map((board) => (
        boardId === board.id && !board.items?.includes(filteredItem)
          ? { ...board, items: [...board.items, filteredItem] }
          : { ...board, items: board.items?.filter((item) => item !== filteredItem) }
      ));
    }

    setCards(c);
    setBoards(b);

    if (selectListAnswers !== undefined) {
      selectListAnswers(b);
    }
  };

  useEffect(() => {
    if (question !== undefined && questionsList !== undefined) {
      setQuestionsList(questionsList.map((quest) => (
        quest.id === question.id ? { ...quest,
          answers: boards.map((board) => ({
            text: board.text,
            answers: board.items?.map((item) => ({
              text: item.text,
            })),
            answers_list: [],
          })) } : quest)));
    }
  }, [boards]);

  return (
    <div>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '16px',
      }}>
        {boards.map(({ text, id }) => (
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
