interface IQuizLevel {
  id: number;
  name: string;
}

const quizLevels: IQuizLevel[] = [
  {
    id: 0,
    name: 'Легкий',
  },
  {
    id: 1,
    name: 'Средний',
  },
  {
    id: 2,
    name: 'Сложный',
  },
];

export default quizLevels;
