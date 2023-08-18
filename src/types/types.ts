/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable camelcase */

export type TRole = 'EMP' | 'AD';

export interface IUser {
  id: number,
  firstName: string,
  lastName: string,
  position: string,
  role: TRole,
  patronymic: string,
  department: string,
  email: string,
  avatar: string,
  pass_progress: number,
  count_assigned: number,
  count_passed: number,
  right_precent: number,
  level: number,
  level_description: string,
  level_image: string,
  to_next_level: number,
  in_this_level: number,
  earned_in_level: number,
  access: string,
  assigned: number,
  rating: number,
}

export interface IUserCreate {
  firstName: string;
  lastName: string;
  patronymic: string;
  position: string;
  department: number;
  email: string;
  role: TRole;
}

export interface IUserLoginRequest {
  email: string;
  password: string;
  role: TRole;
}

export interface IAchievement {
  id: number,
  points_now: number,
  points_to_get: number,
  name: string,
  description: string,
  image: string,
  achived: boolean,
}

export interface IShortAchievement {
  name: string,
  image: string,
}

export interface IShortRating {
  id: number,
  firstName: string,
  lastName: string,
  avatar: string,
  user_rating: number,
}

export interface IDefaultAvatar {
  id: number,
  avatar: string,
  description: string,
}

export interface IAvatar {
  avatar: string,
}

export interface Tag {
  id: number;
  name: string;
  color: string;
}

export interface TagQuiz {
  id: number;
}

export interface Answer {
  id: number;
  text: string;
  image?: string;
  isAnswerRight?: boolean;
  answers?: Answer[];
  answers_list?: AnswerItem[];
}

export type AnswerCreate = Omit<Answer, 'id'>;

export interface AnswerItem {
  id: number;
  text: string;
}

export type AnswerItemCreate = Omit<AnswerItem, 'id'>;

export type TQuestionType = 'ONE' | 'MNY' | 'LST' | 'OPN' | '';

export interface Question {
  id: number;
  image: string;
  text: string;
  answers: Answer[];
  is_answered?: boolean;
  question_type?: TQuestionType;
}

export interface SingleChoiceQuestionProps {
  currentPage: number;
  questions: Question[];
  selectedAnswer: TAnswerItem;
  selectAnswer: (answerId: number) => void;
}

export interface MultipleChoiceQuestionProps {
  currentPage: number;
  questions: Question[];
  selectAnswers: (answerIds: number[]) => void;
  selectedAnswers: number[];
}

export interface OpenEndedQuestionProps {
  selectAnswerText: (text: string) => void;
}

export interface DragAndDropQuestionProps {
  question?: IQuestionAdmin | undefined,
  questionsList?: IQuestionAdmin[] | undefined,
  setQuestionsList?: any,
  boardTitles: BoardTitlesProps[];
  answersList: BoardAnswersProps[];
  selectListAnswers?: (boards: BoardTitlesProps[]) => void
}

export interface IQuestionAdmin {
  id: number;
  question_type: TQuestionType;
  text: string;
  image?: string;
  answers?: Answer[];
  answers_list?: Answer[];
}

export interface Volume {
  id: number;
  name: string;
  description: string;
}

export type VolumeCreate = Omit<Volume, 'id'>;

export interface IQuiz {
  directory: string;
  id: number,
  image: string,
  name: string;
  description: string;
  duration: number;
  level: string;
  question_amount: number;
  tags: Tag[];
  questions: Question[];
  volumes: Volume[];
  isPassed?: any;
  appointed?: any;
  threshold?: number;
}

export interface QuizCardProps {
  setIsConfirmationPopupOpen?: any,
  id: number,
  image: string;
  title: string;
  description: string;
  duration: number;
  level: string;
  question_amount: number;
  tags: any;
  isPassed: any;
}

export interface TAnswerRequest {
  quizId: number | string,
  id: number;
  question_type?: string;
  response_time: number;
  answers: TAnswerItem[];
}

export interface TAnswerItem {
  answer?: number;
  answer_text?: string;
  answer_list: {
    answer_list: number
  }[];
}

export interface Statistic {
  result: boolean;
  info: string;
  statistics: {
    question_type: string;
    question: string;
    explanation: string;
    answer: string;
    user_answer: string;
    is_right: boolean;
    answers: {
      answer_text: string;
      answered: boolean;
      answer_right: boolean;
      is_right: boolean;
      answer_list: {
        text: string;
        answer_right: boolean
      }[];
    }[];
  }[];
}

export interface Item {
  id: number;
  text: string;
}

export interface BoardTitlesProps {
  id: number;
  text: string;
  items: Item[];
}

export interface BoardAnswersProps {
  id: number;
  text: string;
}

export interface BoardProps {
  title: string;
  board: Item[];
  onItemMove: (itemId: number) => void;
}

export interface DnDCardProps {
  id: number;
  text: string;
  backgroundColor: string;
  borderColor: string;
}

export interface AdminQuizz {
  id: number;
  image: string;
  description: string;
  directory: string;
  name: string;
  duration: number;
  level: string;
  question_amount: number;
  threshold: number;
  tags: Tag[];
  questions: IQuestionAdmin[];
  volumes: Volume[];
}

export interface AdminImage {
  id: number;
  image: string;
  description: string;
}

export interface ILevel {
  id: number;
  name: string;
  description: string;
}

export type LevelCreate = Omit<ILevel, 'id'>;

export interface IDepartment {
  id: number;
  name: string;
}
