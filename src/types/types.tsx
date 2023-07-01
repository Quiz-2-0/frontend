/* eslint-disable camelcase */
export type TUser = {
  name: string;
  role: string;
  courses: { [key: string]: any };
  progress: string;
  access: string;
  avatar: string;
  achievements: { [key: string]: any };
  position: string;
  ratingPlace: number;
  appointedCourses: { [key: string]: any };

};

export type TQuiz = {
  id: number,
  image: string,
  description: string,
  directory: string,
  name: string,
  duration: number,
  level: string,
  questionAmount: number,
  tags: string[],
  passed: boolean,
  questions: never[],
};

export type TUserLoginRequest = {
  email: string;
  password: string;
  role: string;
};

type Tag = {
  id: number;
  name: string;
  color: string;
};
type Answer = {
  id: number;
  text: string;
  image: string;
  isAnswerRight: boolean;
};
type Question = {
  id: number;
  image: string;
  text: string;
  answers: Answer[];
};
export type TQuize = {
  image: string,
  name: string;
  description: string;
  duration: number;
  level: string;
  question_amount: number;
  tags: Tag[];
  questions: Question[];
  passed?: any;
};
