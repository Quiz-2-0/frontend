export type TUser = {
  name: string;
  role: string;
  courses: { [key: string]: any };
  progress: string;
  token: string;
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
