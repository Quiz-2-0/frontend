import React, { FC } from 'react';
import styled from 'styled-components';
import { Question } from '@/types/types';

const BarElement = styled.li<{ isCurrentBar: boolean, width: number }>`
  width: 100%;
  background: rgba(63, 138, 224, 0.15);
  border-radius: 12px;

  &:after {
    content: '';
    display: block;
    height: 100%;
    width: 0;
    background: #3F8AE0;
    border-radius: 12px;
    transition: width 1s linear;
  }

  ${({ isCurrentBar }) => (isCurrentBar && '&:after { width: 100%; }')}
`;

const Bar = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  width: 100%;
  display: flex;
  gap: 4px;
  justify-content: space-between;
  height: 8px;
`;

interface IProgressBarProps {
  progressObject: any,
  questionArr: undefined | Question[] | { id: number, name: string }[]
}

const ProgressBar: FC<IProgressBarProps> = ({ progressObject, questionArr }) => (
  <Bar>
    {questionArr?.map((el, index) => (
      <BarElement
        key={el.id}
        width={100 / questionArr.length}
        isCurrentBar={index in progressObject} />
    ))}
  </Bar>
);

export default ProgressBar;
