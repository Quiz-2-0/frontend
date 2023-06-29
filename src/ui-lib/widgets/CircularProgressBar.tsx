import React from 'react';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import styled from 'styled-components';

const StyledPercentageLabel = styled('div')`
  width: 47px;
  height: 22px;
  background-color: #43A843;
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
          stroke: 'rgba(67, 168, 67, 1)',
          strokeLinecap: 'round',
          transition: 'stroke-dashoffset 0.5s ease 0s',
          strokeWidth: '5',
          transform: 'rotate(0.25turn)',
          transformOrigin: 'center center',
        },
        trail: {
          stroke: 'rgba(67, 168, 67, 0.2)',
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
