/* eslint-disable import/prefer-default-export */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import quiz1 from '../images/quizzes/quiz1.png';
import quiz2 from '../images/quizzes/quiz2.png';
import quiz3 from '../images/quizzes/quiz3.png';
import quiz4 from '../images/quizzes/quiz4.png';
import quiz5 from '../images/quizzes/quiz5.png';
import quiz6 from '../images/quizzes/quiz6.png';
/// directory может быть all done appointed
export const mockQuizes = [
  {
    id: 1,
    image: quiz1,
    description: 'Подскажет, как не перегореть на работе.',
    directory: 'all',
    name: 'Баланс работы и личной жизни',
    duration: 20,
    level: 'Лёгкий',
    questionAmount: 10,
    tags: ['Софт Скиллс'],
    passed: false,
    questions: [],
  },
  {
    id: 2,
    image: quiz2,
    description: 'Научит эффективно использовать все возможности цифровой среды.',
    directory: 'all',
    name: 'Цифровая этика',
    duration: 15,
    level: 'Лёгкий',
    questionAmount: 11,
    tags: ['Коммуникация'],
    passed: false,
    questions: [],
  },
  {
    id: 3,
    image: quiz3,
    description: 'Раскроет основные отличия командной работы от других видов группового взаимодействия.',
    directory: 'all',
    name: 'Работа в команде',
    duration: 12,
    level: 'Лёгкий',
    questionAmount: 20,
    tags: ['Новый', 'Коммуникация'],
    passed: false,
    questions: [],
  },
  {
    id: 4,
    image: quiz4,
    description: 'Раскроет секрет повышения результативности рабочих и личных задач.',
    directory: 'all',
    name: 'Эффективность руководителя',
    duration: 25,
    level: 'Средний',
    questionAmount: 15,
    tags: ['Софт Скиллс'],
    passed: false,
    questions: [],
  },
  {
    id: 5,
    image: quiz5,
    description: 'Поможет согласовать личные цели с целями компании и сделать работу продуктивной.',
    directory: 'all',
    name: 'Личная эффективность',
    duration: 20,
    level: 'Лёгкий',
    questionAmount: 10,
    tags: ['Софт Скиллс'],
    passed: false,
    questions: [],
  },
  {
    id: 6,
    image: quiz6,
    description: 'Расскажет, как убеждать слушателей.',
    directory: 'all',
    name: 'Навыки публичных выступлений',
    duration: 20,
    level: 'Лёгкий',
    questionAmount: 10,
    tags: ['Софт Скиллс'],
    passed: false,
    questions: [],
  },
];
