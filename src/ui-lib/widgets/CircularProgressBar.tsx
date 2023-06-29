import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

interface CircularProgressBarProps {
  percentage: number;
}

const CircularProgressBar: React.FC<CircularProgressBarProps> = ({ percentage }) => (
  <div style={{ width: '100px' }}>
    <CircularProgressbar
      value={percentage}
      text={`${percentage}%`}
      styles={buildStyles({
        textColor: '#000',
        pathColor: `rgba(67, 168, 67, ${percentage / 100})`,
        trailColor: 'rgba(67, 168, 67, 0.2)',
      })} />
  </div>
);

export default CircularProgressBar;
