/* eslint-disable promise/always-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-floating-promises */
import {
  FormLayout,
  FormLayoutGroup,
  Select,
  Textarea,
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import styled from 'styled-components';
import StyledInput from '../styled-components/StyledInput';
import StyledFormItem from '../styled-components/StyledFormItem';
import StyledDiv from '../styled-components/StyledDiv';
import {
  useGetAdminQuizQuery,
  useCreateQuizMutation,
  useUpdateQuizMutation,
  useGetDepartmentsQuery,
  useGetTagsQuery,
  useGetLevelsQuery,
} from '@/api/api';
import { StepProps } from '@/constants/steps';
import ErrorPopup from '../popups/ErrorPopup';

const StyledSelect = styled(Select)`
  & > .vkuiSelect {
    min-height: 40px;
  }
`;

const StyledFormLayoutGroup = styled(FormLayoutGroup)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 344px;
  padding: 0;
`;

const StyledFormItemForNewQuiz = styled(StyledFormItem)`
  & > .vkuiFormItem__top {
    color: #6f7985;
  }
`;

const NewQuizStep1: FC<StepProps> = ({
  setIsButtonDisabled,
  isSubmit,
  setIsSubmit,
  setNextPage,
  setQuizId,
  quizId,
}) => {
  const { data: quiz, error } = useGetAdminQuizQuery(quizId, {
    refetchOnMountOrArgChange: true,
  });
  const { data: departments } = useGetDepartmentsQuery();
  const { data: categories } = useGetTagsQuery();
  const { data: quizLevels } = useGetLevelsQuery();

  const [isErrorPopupOpen, setIsErrorPopupOpen] = useState(false);

  const [quizName, setQuizName] = useState(error ? '' : quiz?.name ?? '');
  const [isQuizNameValid, setIsQuizNameValid] = useState(true);

  const [category, setCategory] = useState(error ? NaN : quiz?.tags.find(({ name }) => name !== 'Новый')?.id ?? NaN);
  const [isCategoryValid, setIsCategoryValid] = useState(true);

  const [department, setDepartment] = useState(error ? '' : quiz?.directory ?? '');
  const [isDepartmentValid, setIsDepartmentValid] = useState(true);

  const [level, setLevel] = useState(error ? NaN : quiz?.level ?? NaN);
  const [isLevelValid, setIsLevelValid] = useState(true);

  const [description, setDescription] = useState(error ? '' : quiz?.description ?? '');
  const [isDescriptionValid, setIsDescriptionValid] = useState(true);

  const [categoriesList, setCategoriesList] = useState<{ label: string; value: number }[]>(
    categories?.filter(({ name }) => name !== 'Новый').map((cat: { name: string, id: number }) => ({
      label: cat.name,
      value: cat.id,
    })) ?? [],
  );

  const [departmentsList, setDepartmentsList] = useState<{ label: string; value: number }[]>(
    departments?.map((dep: { name: string, id: number }) => ({
      label: dep.name,
      value: dep.id,
    })) ?? [],
  );

  const [levelsList, setLevelsList] = useState<{ label: string; value: number }[]>(
    quizLevels?.map((ql: { name: string, id: number }) => ({
      label: ql.name,
      value: ql.id,
    })) ?? [],
  );

  const [createQuiz] = useCreateQuizMutation();
  const [updateQuiz] = useUpdateQuizMutation();

  const onSubmit = async () => {
    if (error) {
      await createQuiz({
        description,
        directory: department,
        duration: 0,
        name: quizName,
        level,
        tags: [
          { id: category },
        ],
      })
        .unwrap()
        .then((res) => {
          console.log(res);
          setQuizId(res.id);
          setNextPage();
        })
        .catch((err) => {
          setIsErrorPopupOpen(true);
          console.log(err);
        });
    } else {
      await updateQuiz({
        quizId: quizId ?? 0,
        quiz: {
          description,
          directory: department,
          duration: quiz?.duration ?? 0,
          threshold: quiz?.threshold ?? 70,
          name: quizName,
          level,
          tags: [{ id: category }],
        },
      })
        .unwrap()
        .then((res) => {
          console.log(res);
          setNextPage();
        })
        .catch((err) => {
          console.log(err);
          setIsErrorPopupOpen(true);
        });
    }
  };

  useEffect(() => {
    setQuizName(error ? '' : quiz?.name ?? '');
    setCategory(error ? NaN : quiz?.tags.find(({ name }) => name !== 'Новый')?.id ?? NaN);
    setDepartment(error ? '' : quiz?.directory ?? '');
    setLevel(error ? NaN : quiz?.level ?? NaN);
    setDescription(error ? '' : quiz?.description ?? '');
    setCategoriesList(
      categories?.filter(({ name }) => name !== 'Новый')
        .map((cat) => ({
          label: cat.name,
          value: cat.id,
        })) ?? [],
    );
    setDepartmentsList(
      departments?.map((dep: { name: string, id: number }) => ({
        label: dep.name,
        value: dep.id,
      })) ?? [],
    );
    setLevelsList(
      quizLevels?.map((ql: { name: string, id: number }) => ({
        label: ql.name,
        value: ql.id,
      })) ?? [],
    );
    setIsQuizNameValid(true);
    setIsCategoryValid(true);
    setIsDescriptionValid(true);
    setIsDepartmentValid(true);
    setIsLevelValid(true);
  }, [quiz, departments, categories, quizLevels]);

  useEffect(() => {
    if (isSubmit[0]) {
      onSubmit();
      setIsSubmit([false, false, false, false]);
    }
  }, [isSubmit[0]]);

  useEffect(() => {
    setIsButtonDisabled(
      quizName.length > 3 && quizName?.length < 30 && !Number.isNaN(category)
      && !Number.isNaN(level) && department !== '' && description.length > 20,
    );
  }, [quizName, category, department, level, description]);

  return (
    <StyledDiv style={{ height: 'min-content' }}>
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
              setIsQuizNameValid(quizName?.length > 3 && quizName?.length < 30);
            }}
            onChange={() => setIsQuizNameValid(true)}
            status={isQuizNameValid ? 'default' : 'error'}>
            <StyledInput
              id='quiz-name'
              type='text'
              placeholder='Введите название'
              name='quiz-name'
              value={quizName}
              onChange={(e) => setQuizName(e.target.value)} />
          </StyledFormItemForNewQuiz>
          <StyledFormItemForNewQuiz
            htmlFor='category'
            top='Категория'
            onBlur={() => {
              setIsCategoryValid(!Number.isNaN(category));
            }}
            onChange={() => setIsCategoryValid(true)}
            status={isCategoryValid ? 'default' : 'error'}>
            <StyledSelect
              placeholder='Выберите категорию'
              value={category}
              onChange={(e) => setCategory(Number(e.target.value))}
              options={categoriesList} />
          </StyledFormItemForNewQuiz>
          <StyledFormItemForNewQuiz
            htmlFor='department'
            top='Отдел'
            onBlur={() => {
              setIsDepartmentValid(department !== '');
            }}
            onChange={() => setIsDepartmentValid(true)}
            status={isDepartmentValid ? 'default' : 'error'}>
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
              setIsLevelValid(!Number.isNaN(level));
            }}
            onChange={() => setIsLevelValid(true)}
            status={isLevelValid ? 'default' : 'error'}>
            <StyledSelect
              placeholder='Выберите уровень'
              value={level}
              onChange={(e) => setLevel(Number(e.target.value))}
              options={levelsList} />
          </StyledFormItemForNewQuiz>
        </StyledFormLayoutGroup>
        <StyledFormLayoutGroup>
          <StyledFormItemForNewQuiz
            htmlFor='description'
            top='Описание'
            onBlur={() => {
              setIsDescriptionValid(description.length > 20);
            }}
            onChange={() => setIsDescriptionValid(true)}
            status={isDescriptionValid ? 'default' : 'error'}
            style={{
              width: '100%',
              minWidth: '582px',
              boxSizing: 'border-box',
            }}>
            <Textarea
              style={{ height: '320px', alignItems: 'flex-start' }}
              placeholder='Введите описание'
              value={description}
              onChange={(e) => setDescription(e.target.value)} />
          </StyledFormItemForNewQuiz>
        </StyledFormLayoutGroup>
      </FormLayout>
      <ErrorPopup
        title='Что-то пошло не так'
        description='В процессе создания квиза что-то пошло не так... Попробуйте ещё раз.'
        button='Вернуться к форме'
        isErrorPopupOpen={isErrorPopupOpen}
        setIsErrorPopupOpen={setIsErrorPopupOpen} />
    </StyledDiv>
  );
};

export default NewQuizStep1;
