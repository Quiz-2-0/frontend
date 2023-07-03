/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable camelcase */
export type TUser = {
  firstName: string;
  lastName: string;
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

export type Volume = {
  name: string;
  description: string;
};

export type TQuize = {
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
  isPassed: any;
  appointed: any;
};

export type QuizCardProps = {
  id: number,
  image: string;
  title: string;
  description: string;
  duration: number;
  level: string;
  question_amount: number;
  tags: any;
};
