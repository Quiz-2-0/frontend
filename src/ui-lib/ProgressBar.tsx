/* eslint-disable max-len */
import React, { FC } from 'react';
import styled from 'styled-components';
import { Question } from '../types/types';

const BarElement = styled.li<{ isCurrentBar: boolean, width: number }>`
    
    flex-basis: ${({ width }) => width}%;
    background-color:${({ isCurrentBar }) => (isCurrentBar ? '#3F8AE0' : 'rgba(63, 138, 224, 0.15)')};
    border-right: 3px solid #3F8AE0;
    &:last-of-type {
        border-right: none;
        border-radius: 0px 8px 8px 0px;
    }
    &:first-of-type {
        border-radius: 8px 0px 0px 8px;

    }
`;

const Bar = styled.ul`
    list-style: none;
    margin: 0;
    padding: 0;
    max-width: 914px;
    width: 100%;
    display: flex;
    height: 8px;
`;

const ProgressBar: FC<{ progressObject: any, questionArr: Question[] }> = ({ progressObject, questionArr }) => (
  <Bar>
    {questionArr.map((el, index) => (
      <BarElement width={100 / questionArr.length} isCurrentBar={index in progressObject} key={el.id} />
    ))}
  </Bar>
);

export default ProgressBar;
