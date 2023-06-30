/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import level1Img from '../images/houses/level1.png';
import level2Img from '../images/houses/level2.png';
import level3Img from '../images/houses/level3.png';
import level4Img from '../images/houses/level4.png';
import level5Img from '../images/houses/level5.png';
import level6Img from '../images/houses/level6.png';
import level7Img from '../images/houses/level7.png';
import level8Img from '../images/houses/level8.png';

const levels = [
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
