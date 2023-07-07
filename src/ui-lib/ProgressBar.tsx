/* eslint-disable max-len */
import React, { FC } from 'react';
import styled from 'styled-components';
import { Question } from '../types/types';

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
  max-width: 914px;
  width: 100%;
  display: flex;
  gap: 4px;
  justify-content: space-between;
  height: 8px;
`;

const ProgressBar: FC<{ progressObject: any, questionArr: Question[] | undefined }> = ({ progressObject, questionArr }) => (
  <Bar>
    {questionArr && questionArr.map((el, index) => (
      <BarElement width={100 / questionArr.length} isCurrentBar={index in progressObject} key={el.id} />
    ))}
  </Bar>
);

export default ProgressBar;
