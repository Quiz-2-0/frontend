/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable import/no-cycle */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable array-callback-return */
/* eslint-disable ternary/no-unreachable */
import React, { FC, useState, useEffect } from 'react';
import {
  FormLayout,
  FormLayoutGroup,
  IconButton,
  Select,
  Text,
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import { Icon28DeleteOutline, Icon28InfoCircleOutline } from '@vkontakte/icons';
import styled from 'styled-components';
import StyledInput from '../styled-components/StyledInput';
import questionTypes from '@/constants/question-types';
import StyledDiv from '../styled-components/StyledDiv';
import { FormElements, SetFormElements, StepProps } from '../../constants/steps';
import FormItemForNewQuiz from '../styled-components/FormItemForNewQuiz';
import { IQuestionAdmin } from '@/types/types';
import { useCreateQuestionMutation, useCreateQuestionsListMutation } from '@/api/apiv2';

const StyledSelect = styled(Select)`
  & > .vkuiSelect {
    min-height: 40px;
  }
`;

const Info = styled.div`
  width: 28px;
  height: 28px;
  position: relative;

  &:hover {
    .hidden_info {
      visibility: visible;
      opacity: 1;
    }
  }
`;

const HiddenInfo = styled.div`
  position: absolute;
  top: 48px;
  right: 0;
  width: 452px;
  height: min-content;
  padding: 10px 12px;
  box-sizing: border-box;
  border-radius: 4px;
  border: 1px solid #3f8ae0;
  background: rgba(63, 138, 224, 0.05);
  visibility: hidden;
  opacity: 0;
  transition: all 0.3s ease;
`;

const questionTypesList: { label: string; value: string }[] = [];
questionTypes.map(({ name, shortname }: {
  name: string,
  shortname: string,
}) => questionTypesList.push({
  label: name,
  value: shortname,
}));

const NewQuizStep2: FC<StepProps> = ({
  questionsList,
  formElements,
  setFormElements,
  quizId,
  setNextPage,
  isSubmit,
  setIsSubmit,
  setIsButtonDisabled,
}) => {
  const { isQuestionTextValid } = formElements;
  const { setIsQuestionTextValid } = setFormElements;
  const { isQuestionTypeValid } = formElements;
  const { setIsQuestionTypeValid } = setFormElements;
  const { setQuestionsList } = setFormElements;
  const [createQuestionsList] = useCreateQuestionsListMutation();

  const renderElement = (typeName: string, question: IQuestionAdmin) => {
    const type = questionTypes.find(({ shortname }) => (typeName === shortname)) ?? { id: -1, name: '', markup: { Component: () => null } };
    return (
      <type.markup.Component
        question={question}
        questionsList={questionsList}
        setQuestionsList={setQuestionsList} />
    );
  };

  const onSubmit = async () => {
    await createQuestionsList({
      quizId,
      questions: questionsList,
    });
    setNextPage();
    setIsSubmit([false, false, false, false]);
  };

  useEffect(() => {
    const isDisabled: boolean = questionsList.some(({ text, question_type, answers }) => (
      text !== '' && question_type !== '' && answers?.some((answer) => answer.text !== '')
      && answers.length > 0
    ));
    setIsButtonDisabled(isDisabled);
  }, [questionsList]);

  useEffect(() => {
    if (isSubmit[1]) {
      onSubmit();
    }
  }, [isSubmit]);
  console.log(questionsList);

  return (
    <>
      {questionsList.map((question, i) => (
        <StyledDiv key={question.id} style={{ height: 'min-content', marginTop: '24px' }}>
          <FormLayout>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignContent: 'center',
                flexWrap: 'wrap',
                marginBottom: '40px',
              }}>
              <Text
                style={{
                  color: '#818C99',
                  fontSize: '16px',
                  fontWeight: '500',
                  lineHeight: '20px',
                  letterSpacing: '-0.32px',
                }}>
                {`Вопрос №${i + 1}`}
              </Text>
              <IconButton
                style={{
                  width: '28px',
                  height: '28px',
                  visibility: `${question.text !== '' && question.question_type !== '' ? 'visible' : 'hidden'}`,
                  opacity: `${question.text !== '' && question.question_type !== '' ? '1' : '0'}`,
                  transition: 'all .3s ease',
                }}
                aria-label='Удалить вопрос'
                onClick={() => {
                  setQuestionsList((questionsList.filter(({ id }) => (
                    id !== question.id
                  ))).map((quest, ind) => ({ ...quest, id: ind })));
                  setIsQuestionTextValid((isQuestionTextValid.filter(({ id }) => (
                    id !== question.id
                  ))).map((val, ind) => ({ ...val, id: ind })));
                  setIsQuestionTypeValid((isQuestionTypeValid.filter(({ id }) => (
                    id !== question.id
                  ))).map((val, ind) => ({ ...val, id: ind })));
                }}>
                <Icon28DeleteOutline fill='#99A2AD' />
              </IconButton>
            </div>
            <FormLayoutGroup mode='horizontal' style={{ padding: 0 }}>
              <FormItemForNewQuiz
                htmlFor='question-text'
                top='Текст вопроса'
                onBlur={() => {
                  setIsQuestionTextValid(isQuestionTextValid.map((valid) => (
                    valid.id === question.id ? { ...valid, isValid: question.text !== '' } : valid
                  )));
                }}
                onChange={() => (
                  setIsQuestionTextValid(isQuestionTextValid.map((valid) => (
                    valid.id === question.id ? { ...valid, isValid: true } : valid
                  ))))}
                status={isQuestionTextValid[question.id].isValid ? 'default' : 'error'}
                style={{ maxWidth: '546px' }}>
                <StyledInput
                  style={{ minHeight: '40px' }}
                  id='question-text'
                  type='text'
                  placeholder='Введите вопрос'
                  name='question-text'
                  value={question.text}
                  onChange={(e) => {
                    setQuestionsList(
                      questionsList.map((quest) => (
                        quest.id === question.id ? { ...quest, text: e.target.value } : quest)),
                    );
                  }} />
              </FormItemForNewQuiz>
              <FormItemForNewQuiz
                htmlFor='question-type'
                top='Тип вопроса'
                onBlur={() => {
                  setIsQuestionTypeValid(isQuestionTypeValid.map((valid) => (
                    valid.id === question.id ? { ...valid, isValid: question.question_type !== '' } : valid
                  )));
                }}
                onChange={() => (
                  setIsQuestionTypeValid(isQuestionTypeValid.map((valid) => (
                    valid.id === question.id ? { ...valid, isValid: true } : valid
                  ))))}
                status={isQuestionTypeValid[question.id].isValid ? 'default' : 'error'}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '12px',
                  }}>
                  <StyledSelect
                    style={{ width: '100%' }}
                    placeholder='Выберите тип вопроса'
                    value={question.question_type}
                    onChange={(e) => {
                      setQuestionsList(
                        questionsList.map((type) => (
                          type.id === question.id ? {
                            ...type, question_type: e.target.value,
                          } : type)),
                      );
                    }}
                    options={questionTypesList} />
                  <Info>
                    <Icon28InfoCircleOutline fill='#3F8AE0' />
                    <HiddenInfo className='hidden_info'>
                      <Text>
                        {question.question_type === ''
                          ? 'Выберите тип вопроса из списка и введите текст вопроса'
                          : questionTypes.find(({ shortname }) => (
                            question.question_type === shortname))?.hiddeninfo}
                      </Text>
                    </HiddenInfo>
                  </Info>
                </div>
              </FormItemForNewQuiz>
            </FormLayoutGroup>
            {question.question_type !== '' && question.text !== '' && renderElement(question.question_type, question)}
          </FormLayout>
        </StyledDiv>
      ))}
    </>
  );
};

export default NewQuizStep2;
