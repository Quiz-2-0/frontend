/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable camelcase */

export interface IUser {
  firstName: string;
  lastName: string;
  role: string;
  courses: Record<string, any>;
  progress: string;
  access: string;
  avatar: string;
  achievements: Record<string, any>;
  position: string;
  ratingPlace: number;
  appointedCourses: Record<string, any>;
}

export interface IUserLoginRequest {
  email: string;
  password: string;
  role: string;
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
  selectedAnswer: number;
  selectAnswer: (answerId: number) => void;
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
  id: number | string;
  quizId: number | string;
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
