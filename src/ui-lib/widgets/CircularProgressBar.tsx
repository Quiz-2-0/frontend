import React from 'react';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import styled from 'styled-components';

const StyledPercentageLabel = styled('div')`
  width: 47px;
  height: 22px;
  background-color: #3F8AE0;
  border-radius: 11px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-size: 12px;
  line-height: 14px;
  font-weight: 400;
  text-align: center;
`;

interface CircularProgressBarProps {
  percentage: number;
}

const CircularProgressBar: React.FC<CircularProgressBarProps> = ({ percentage }) => (
  <div style={{ width: '100px' }}>
    <CircularProgressbarWithChildren
      value={percentage}
      styles={{
        path: {
          stroke: '#3F8AE0',
          strokeLinecap: 'round',
          transition: 'stroke-dashoffset 0.5s ease 0s',
          strokeWidth: '5',
          transform: 'rotate(2turn)',
          transformOrigin: 'center center',
        },
        trail: {
          stroke: 'rgba(63, 138, 224, .2)',
          strokeWidth: '5',
        },
      }}>
      <StyledPercentageLabel>
        {`${percentage}%`}
      </StyledPercentageLabel>
    </CircularProgressbarWithChildren>
  </div>
);

export default CircularProgressBar;
