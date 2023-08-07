/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable array-callback-return */
/* eslint-disable ternary/no-unreachable */
import {
  FormLayout,
  FormLayoutGroup,
  Select,
  Textarea,
} from '@vkontakte/vkui';
import React, { FC, useState } from 'react';
import styled from 'styled-components';
import StyledInput from '../styled-components/StyledInput';
import StyledFormItem from '../styled-components/StyledFormItem';
import categories from '../../constants/category';
import departments from '../../constants/departments';
import quizLevels from '../../constants/quizLevels';

const StyledSelect = styled(Select)`
  & > .vkuiSelect {
    min-height: 40px;
  }
`;

const StyledFormLayoutGroup = styled(FormLayoutGroup)`
  width: 100%;
  min-height: 352px;
  padding: 0;
`;

const StyledFormItemForNewQuiz = styled(StyledFormItem)`
  & > .vkuiFormItem__top {
    color: #6f7985;
  }
`;

const NewQuizStep1: FC = () => {
  const [quizName, setQuizName] = useState('');
  const [isQuizNameValid, setIsQuizNameValid] = useState(true);
  const [category, setCategory] = useState('');
  const [isCategoryValid, setIsCategoryValid] = useState(true);
  const [department, setDepartment] = useState('');
  const [isDepartmentValid, setIsDepartmentValid] = useState(true);
  const [level, setLevel] = useState('');
  const [isLevelValid, setIsLevelValid] = useState(true);
  const [description, setDescription] = useState('');
  const [isDescriptionValid, setIsDescriptionValid] = useState(true);

  const onChange = (e: { currentTarget: { name: any; value: any; }; }) => {
    const { name, value } = e.currentTarget;
    [{ text: 'quiz-name', method: setQuizName },
      { text: 'category', method: setCategory },
      { text: 'department', method: setDepartment },
      { text: 'level', method: setLevel },
      { text: 'descriptin', method: setDescription }].map(({ text, method }) => {
      if (name === text) {
        method(value);
      }
    });
  };

  const resetForm = () => {
    setQuizName('');
    setCategory('');
    setDescription('');
    setDepartment('');
    setLevel('');
    setIsQuizNameValid(true);
    setIsCategoryValid(true);
    setIsDescriptionValid(true);
    setIsDepartmentValid(true);
    setIsLevelValid(true);
  };

  const onSubmit = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    console.log({
      quizName,
      category,
      department,
      level,
      description,
    });
    resetForm();
  };

  const categoriesList: { label: string; value: string; }[] = [];
  categories.map(({ name }: { name: string }) => categoriesList.push({
    label: name,
    value: name,
  }));

  const departmentsList: { label: string; value: string; }[] = [];
  departments.map(({ name }: { name: string }) => departmentsList.push({
    label: name,
    value: name,
  }));

  const levelsList: { label: string; value: string; }[] = [];
  quizLevels.map(({ name }: { name: string }) => levelsList.push({
    label: name,
    value: name,
  }));

  return (
    <FormLayout
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        gap: '32px',
      }}>
      <StyledFormLayoutGroup>
        <StyledFormItemForNewQuiz
          htmlFor='quiz-name'
          top='Название'
          onBlur={() => {
            const regex = /^[A-ZА-Я][a-zа-яA-ZА-я".,-?!:'\s]{2,28}/;
            setIsQuizNameValid(regex.test(quizName));
          }}
          onChange={() => setIsQuizNameValid(true)}
          status={isQuizNameValid ? 'default' : 'error'}
          bottom={isQuizNameValid ? '' : 'Неверно введено название квиза'}
          style={{ paddingBottom: `${isQuizNameValid ? '24px' : '0px'}` }}>
          <StyledInput
            id='quiz-name'
            type='text'
            placeholder='Введите название'
            name='quiz-name'
            value={quizName}
            onChange={onChange} />
        </StyledFormItemForNewQuiz>
        <StyledFormItemForNewQuiz
          htmlFor='category'
          top='Категория'
          onBlur={() => {
            setIsCategoryValid(category !== '');
          }}
          onChange={() => setIsCategoryValid(true)}
          status={isCategoryValid ? 'default' : 'error'}
          bottom={isCategoryValid ? '' : 'Категория не выбрана'}
          style={{ paddingBottom: `${isCategoryValid ? '24px' : '0px'}` }}>
          <StyledSelect
            placeholder='Выберите категорию'
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            options={categoriesList} />
        </StyledFormItemForNewQuiz>
        <StyledFormItemForNewQuiz
          htmlFor='department'
          top='Отдел'
          onBlur={() => {
            setIsDepartmentValid(department !== '');
          }}
          onChange={() => setIsDepartmentValid(true)}
          status={isDepartmentValid ? 'default' : 'error'}
          bottom={isDepartmentValid ? '' : 'Категория не выбрана'}
          style={{ paddingBottom: `${isDepartmentValid ? '24px' : '0'}` }}>
          <StyledSelect
            placeholder='Выберите отдел'
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            options={departmentsList} />
        </StyledFormItemForNewQuiz>
        <StyledFormItemForNewQuiz
          htmlFor='level'
          top='Уровень'
          onBlur={() => {
            setIsLevelValid(level !== '');
          }}
          onChange={() => setIsLevelValid(true)}
          status={isLevelValid ? 'default' : 'error'}
          bottom={isLevelValid ? '' : 'Категория не выбрана'}
          style={{ paddingBottom: `${isLevelValid ? '24px' : '0'}` }}>
          <StyledSelect
            placeholder='Выберите отдел'
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            options={levelsList} />
        </StyledFormItemForNewQuiz>
      </StyledFormLayoutGroup>
      <StyledFormLayoutGroup>
        <StyledFormItemForNewQuiz
          htmlFor='description'
          top='Описание'
          onBlur={() => {
            setIsDescriptionValid(description.length > 100);
          }}
          onChange={() => setIsDescriptionValid(true)}
          status={isDescriptionValid ? 'default' : 'error'}
          bottom={isDescriptionValid ? '' : 'Введите описание'}
          style={{
            width: '100%',
            minWidth: '582px',
            boxSizing: 'border-box',
            paddingBottom: `${isDescriptionValid ? '24px' : '0'}`,
          }}>
          <Textarea
            style={{ height: '300px' }}
            placeholder='Введите описание'
            value={description}
            onChange={(e) => setDescription(e.target.value)} />
        </StyledFormItemForNewQuiz>
      </StyledFormLayoutGroup>
    </FormLayout>
  );
};

export default NewQuizStep1;
