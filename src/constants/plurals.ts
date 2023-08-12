import { getPluralNoun } from '@/utils/plurals';

export const plurals = {
  minutes: (num: number) => getPluralNoun(num, 'минута', 'минуты', 'минут'),
  questions: (num: number) => getPluralNoun(num, 'вопрос', 'вопроса', 'вопросов'),
  quizzes: (num: number) => getPluralNoun(num, 'квиз', 'квиза', 'квизов'),
  victories: (num: number) => getPluralNoun(num, 'победа', 'победы', 'побед'),
};

export const pluralsFull = {
  minutes: (num: number) => `${num} ${plurals.minutes(num)}`,
  questions: (num: number) => `${num} ${plurals.questions(num)}`,
  quizzes: (num: number) => `${num} ${plurals.quizzes(num)}`,
  victories: (num: number) => `${num} ${plurals.victories(num)}`,
};
