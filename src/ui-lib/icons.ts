/* eslint-disable @typescript-eslint/no-unsafe-return */
import React from 'react';
import styled from 'styled-components';

import { ReactComponent as Bell } from '../images/icons/notification.svg';
import { ReactComponent as LogOut } from '../images/icons/logout.svg';
import { ReactComponent as RedBall } from '../images/icons/redball.svg';
import { ReactComponent as Arrow } from '../images/icons/arrow.svg';
import { ReactComponent as Cup } from '../images/icons/cup_outline_24.svg';
import { ReactComponent as FourSquare } from '../images/icons/square_4_outline_20.svg';
import { ReactComponent as Duration } from '../images/icons/duration_icon.svg';
import { ReactComponent as Level } from '../images/icons/level_icon.svg';
import { ReactComponent as Questions } from '../images/icons/questions_icon.svg';
import { ReactComponent as Check } from '../images/icons/checked.svg';
import { ReactComponent as False } from '../images/icons/false.svg';
import { ReactComponent as Quiz } from '../images/progress-icons/progress_quiz.svg';
import { ReactComponent as True } from '../images/progress-icons/progress_true_answers.svg';
import { ReactComponent as Time } from '../images/progress-icons/progress_time.svg';
import { ReactComponent as Battle } from '../images/progress-icons/progress_battle.svg';

export const DurationIcon = styled(Duration)`
  width: 14px;
  height: 14px;
  cursor: pointer;
`;

export const LevelIcon = styled(Level)`
  width: 10px;
  height: 12px;
  cursor: pointer;
`;

export const QuestionsIcon = styled(Questions)`
  width: 13px;
  height: 11px;
  cursor: pointer;
`;

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

export const CheckIcon = styled(Check)`
  width: 28px;
  height: 28px;
  display: block;
`;

export const FalseIcon = styled(False)`
  width: 28px;
  height: 28px;
  display: block;
`;

export const QuizIcon = styled(Quiz)`
  width: 24px;
  height: 21px;
  display: block;
`;

export const TrueIcon = styled(True)`
  width: 24px;
  height: 22px;
  display: block;
`;

export const TimeIcon = styled(Time)`
  width: 20px;
  height: 24px;
  display: block;
`;

export const BattleIcon = styled(Battle)`
  width: 24px;
  height: 24px;
  display: block;
`;
