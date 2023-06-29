/* eslint-disable @typescript-eslint/no-unsafe-return */
import React from 'react';
import styled from 'styled-components';

import { ReactComponent as Bell } from '../images/notification.svg';
import { ReactComponent as LogOut } from '../images/logout.svg';
import { ReactComponent as RedBall } from '../images/redball.svg';
import { ReactComponent as Arrow } from '../images/arrow.svg';
import { ReactComponent as Cup } from '../images/cup_outline_24.svg';
import { ReactComponent as FourSquare } from '../images/square_4_outline_20.svg';

export const CupIcon = styled(Cup)`
   width: 20px;
   height: 20px;
   cursor: pointer;
`;

export const SquareIcon = styled(FourSquare)`
   width: 20px;
   height: 20px;
   cursor: pointer;
`;

export const ArrowIcon = styled(Arrow)`
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

export const BellIcon = styled(Bell)`
  width: 28px;
  height: 28px;
  display: block;
  position: relative;
`;

export const LogOuticon = styled(LogOut)`
    width: 28px;
    height: 28px;
    display: block;
    cursor: pointer;
`;

export const RedBallIcon = styled(RedBall)<{ top:number, left:number }>`
    width: 6px;
    height: 6px;
    position: absolute;
    top: ${({ top }) => top}px;
    left: ${({ left }) => left}px;
`;
