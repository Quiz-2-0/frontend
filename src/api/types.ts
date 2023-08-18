import { IUserCreate, LevelCreate, IQuestionAdmin, Tag, TagQuiz, VolumeCreate } from '@/types/types';

export interface TAnswerRequest {
  id: number | string;
  quizId: number | string;
}

export interface IUserLoginRequest {
  email: string;
  password: string;
  role: string;
}

export interface IAdminTagsRequest {
  name: string;
  color: string;
}

export interface IAdminUpdateLevelsRequest {
  levelId: number;
  level: LevelCreate;
}

export interface IAssignedUser {
  id: number;
}

export interface IAssignedQuiz {
  id: number;
}

export interface IAdminCreateQuizRequest {
  id?: number;
  question_amount?: number;
  questions?: IAdminCreateQuestionRequest[];
  volumes?: IAdminGetVolumeRequest[];
  image?: string;
  description?: string;
  directory?: string;
  name?: string;
  duration?: number;
  level?: number;
  threshold?: number;
  tags?: TagQuiz[];
}

export interface IAdminGetQuizRequest {
  image: string;
  description: string;
  directory: string;
  name: string;
  duration: number;
  level: number;
  threshold: number;
  tags: Tag[];
}

export interface IAdminAssignQuizzesToUsersRequest {
  users: IAssignedUser[];
  quizes: IAssignedQuiz[];
}

export interface IAdminUpdateQuizRequest {
  quizId: number;
  quiz: IAdminCreateQuizRequest;
}

export interface IAdminCreateQuestionRequest {
  quizId: number;
  question: IQuestionAdmin;
}

export interface IAdminCreateQuestionsListRequest {
  quizId: number;
  questions: IQuestionAdmin[];
}

export interface IAdminUpdateQuestionRequest {
  quizId: number;
  questionId: number;
  question: IQuestionAdmin;
}

export interface IAdminRemoveQuestionRequest {
  quizId: number;
  questionId: number;
}

export interface IAdminCreateVolumeRequest {
  quizId: number;
  volume: VolumeCreate;
}

export interface IAdminGetVolumeRequest {
  quizId: number;
  volumeId: number;
}

export interface IAdminUpdateVolumeRequest {
  quizId: number;
  volumeId: number;
  volume: VolumeCreate;
}

export interface IAdminRemoveVolumeRequest {
  quizId: number;
  volumeId: number;
}

export interface IAdminUpdateUserRequest {
  userId: number;
  user: IUserCreate;
}
