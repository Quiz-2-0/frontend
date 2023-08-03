import React from 'react';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import styled from 'styled-components';

const StyledPercentageLabel = styled('div')`
  width: 60px;
  height: 60px;
  background-color: #ffffff;
  border-radius: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #000000;
  font-size: 16px;
  line-height: 20px;
  font-weight: 500;
  text-align: center;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.06), 0 4px 8px 0 rgba(0, 0, 0, 0.04);
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
          strokeWidth: '8',
          transform: 'rotate(2turn)',
          transformOrigin: 'center center',
        },
        trail: {
          stroke: 'rgba(63, 138, 224, .2)',
          strokeWidth: '8',
        },
      }}>
      <StyledPercentageLabel>
        {`${percentage}%`}
      </StyledPercentageLabel>
    </CircularProgressbarWithChildren>
  </div>
);

export default CircularProgressBar;
