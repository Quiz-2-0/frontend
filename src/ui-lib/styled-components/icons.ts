import styled from 'styled-components';

import { ReactComponent as Bell } from '@/assets/images/icons/notification.svg';
import { ReactComponent as LogOut } from '@/assets/images/icons/logout.svg';
import { ReactComponent as RedBall } from '@/assets/images/icons/redball.svg';
import { ReactComponent as Arrow } from '@/assets/images/icons/arrow.svg';
import { ReactComponent as Cup } from '@/assets/images/icons/cup_outline_24.svg';
import { ReactComponent as FourSquare } from '@/assets/images/icons/square_4_outline_20.svg';
import { ReactComponent as Duration } from '@/assets/images/icons/duration_icon.svg';
import { ReactComponent as Level } from '@/assets/images/icons/level_icon.svg';
import { ReactComponent as Questions } from '@/assets/images/icons/questions_icon.svg';
import { ReactComponent as Check } from '@/assets/images/icons/checked.svg';
import { ReactComponent as False } from '@/assets/images/icons/false.svg';
import { ReactComponent as Quiz } from '@/assets/images/progress-icons/progress_quiz.svg';
import { ReactComponent as True } from '@/assets/images/progress-icons/progress_true_answers.svg';
import { ReactComponent as Time } from '@/assets/images/progress-icons/progress_time.svg';
import { ReactComponent as Battle } from '@/assets/images/progress-icons/progress_battle.svg';
import { ReactComponent as Avatar } from '@/assets/images/icons/avatar_icon.svg';
import { ReactComponent as Close } from '@/assets/images/icons/close_button_icon.svg';
import { ReactComponent as Upload } from '@/assets/images/icons/upload.svg';

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

export const LogOutIcon = styled(LogOut)`
    width: 28px;
    height: 28px;
    display: block;
    cursor: pointer;
`;

interface TIcoPos {
  top?: number | string;
  left?: number | string;
}

export const RedBallIcon = styled(RedBall)<TIcoPos>`
    width: 6px;
    height: 6px;
    position: absolute;
    top: ${({ top }) => String(top)}px;
    left: ${({ left }) => String(left)}px;
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

export const AvatarIcon = styled(Avatar)`
  width: 20px;
  height: 18px;
  display: block;
  z-index: 2;
`;

export const CloseIcon = styled(Close)`
  width: 16px;
  height: 16px;
  cursor: pointer;
`;

export const UploadIcon = styled(Upload)`
  width: 16px;
  height: 21px;
  cursor: pointer;
`;
