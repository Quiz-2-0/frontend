import level1Img from '@/assets/images/houses/level1.png';
import level2Img from '@/assets/images/houses/level2.png';
import level3Img from '@/assets/images/houses/level3.png';
import level4Img from '@/assets/images/houses/level4.png';
import level5Img from '@/assets/images/houses/level5.png';
import level6Img from '@/assets/images/houses/level6.png';
import level7Img from '@/assets/images/houses/level7.png';
import level8Img from '@/assets/images/houses/level8.png';

export interface ILevel {
  level: number;
  image: string;
  title: string;
  numberOfQuizzes: number;
  tiTheNextLevel?: number;
}

const levels: ILevel[] = [
  {
    level: 1,
    image: level1Img,
    title: 'Поле',
    numberOfQuizzes: 0,
  },
  {
    level: 2,
    image: level2Img,
    title: 'Палатка',
    numberOfQuizzes: 2,
  },
  {
    level: 3,
    image: level3Img,
    title: 'Хижина в лесу',
    numberOfQuizzes: 5,
  },
  {
    level: 4,
    image: level4Img,
    title: 'У бабушки в деревне',
    numberOfQuizzes: 9,
  },
  {
    level: 5,
    image: level5Img,
    title: 'Загородный дом',
    numberOfQuizzes: 14,
    tiTheNextLevel: 6,
  },
  {
    level: 6,
    image: level6Img,
    title: 'Усадьба',
    numberOfQuizzes: 20,
  },
  {
    level: 7,
    image: level7Img,
    title: 'Поместье',
    numberOfQuizzes: 27,
  },
  {
    level: 8,
    image: level8Img,
    title: 'Замок',
    numberOfQuizzes: 35,
  },
];

export default levels;
