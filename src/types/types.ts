/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable camelcase */

export interface IUser {
  id: number,
  firstName: string,
  lastName: string,
  position: string,
  role: string,
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
}

export interface IUserLoginRequest {
  email: string;
  password: string;
  role: string;
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

interface Tag {
  id: number;
  name: string;
  color: string;
}

export interface Answer {
  id: number;
  text: string;
  image: string;
  isAnswerRight?: boolean;
  answer_list?: AnswerItem[];
}

export interface AnswerItem {
  id: number;
  text: string;
}

export interface Question {
  id: number;
  image: string;
  text: string;
  answers: Answer[];
  is_answered?: boolean;
  question_type?: string;
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

export interface Volume {
  id: number;
  name: string;
  description: string;
}

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
    answer_list:number
  }[];
}

export interface Statistic {
  explanation: string;
  isRight: boolean;
  question: string;
  right_answer: string;
  user_answer: string;
}

export interface Item {
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
  tags: {
    id: number;
    name: string;
    color: string;
  }[];
  questions: {
    id: number;
    question_type: string;
    text: string;
    image: string;
    answers: {
      id: number;
      text: string,
      image: string,
      answer_list: {
        id: number;
        text: string;
      }[]
    }[]
  }[];
  volumes: {
    id: number;
    name: string;
    description: string;
  }[];
}
