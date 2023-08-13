/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable import/no-cycle */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable array-callback-return */
/* eslint-disable ternary/no-unreachable */
import React, { FC, useState } from 'react';
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
import { FormElements, SetFormElements } from '../../constants/steps';
import FormItemForNewQuiz from '../styled-components/FormItemForNewQuiz';
import { IQuestionType, QuestionTypeProps } from '@/constants/question-types';

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
questionTypes.map(({ name }: { name: string }) => questionTypesList.push({
  label: name,
  value: name,
}));

const NewQuizStep2: FC<{
  items: number[],
  setItems: any,
  formElements: FormElements,
  setFormElements: SetFormElements,
}> = ({
  items,
  setItems,
  formElements,
  setFormElements,
}) => {
  const questionText = formElements.questionText as { id: number, text: string }[];
  const { setQuestionText } = setFormElements;
  const questionType = formElements.questionType as { id: number, text: string }[];
  const { setQuestionType } = setFormElements;
  const isQuestionTextValid = formElements.isQuestionTextValid as {
    id: number, isValid: boolean
  }[];
  const { setIsQuestionTextValid } = setFormElements;
  const isQuestionTypeValid = formElements.isQuestionTypeValid as {
    id: number, isValid: boolean
  }[];
  const { setIsQuestionTypeValid } = setFormElements;

  const renderElement = (typeName: string, questionId: number) => {
    const type: IQuestionType<QuestionTypeProps> =
    questionTypes.find(({ name }) => (typeName === name)) ?? { id: -1, name: '', markup: { Component: () => null } };
    return (
      <type.markup.Component
        questionId={questionId} />
    );
  };

  return (
    <>
      {items.map((question) => (
        <StyledDiv key={question} style={{ height: 'min-content', marginTop: '24px' }}>
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
                {`Вопрос №${question + 1}`}
              </Text>
              <IconButton
                style={{ width: '28px', height: '28px' }}
                aria-label='Удалить вопрос'
                onClick={() => {
                  setQuestionText((questionText.filter(({ id }) => (
                    id !== question
                  ))).map((quest, ind) => ({ ...quest, id: ind })));
                  setQuestionType((questionType.filter(({ id }) => (
                    id !== question
                  ))).map((quest, ind) => ({ ...quest, id: ind })));
                  setIsQuestionTextValid((isQuestionTextValid.filter(({ id }) => (
                    id !== question
                  ))).map((quest, ind) => ({ ...quest, id: ind })));
                  setIsQuestionTypeValid((isQuestionTypeValid.filter(({ id }) => (
                    id !== question
                  ))).map((quest, ind) => ({ ...quest, id: ind })));
                  setItems((items.filter((item) => item !== question)).map((num, ind) => ind));
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
                    valid.id === question ? { ...valid, text: questionText[question].text !== '' } : valid
                  )));
                }}
                onChange={() => (
                  setIsQuestionTextValid(isQuestionTextValid.map((valid) => (
                    valid.id === question ? { ...valid, isValid: true } : valid
                  ))))}
                status={isQuestionTextValid[question] ? 'default' : 'error'}
                style={{ maxWidth: '546px' }}>
                <StyledInput
                  style={{ minHeight: '40px' }}
                  id='question-text'
                  type='text'
                  placeholder='Введите вопрос'
                  name='question-text'
                  value={questionText[question].text}
                  onChange={(e) => {
                    setQuestionText(
                      questionText.map((quest) => (
                        quest.id === question ? { ...quest, text: e.target.value } : quest)),
                    );
                  }} />
              </FormItemForNewQuiz>
              <FormItemForNewQuiz
                htmlFor='question-type'
                top='Тип вопроса'
                onBlur={() => {
                  setIsQuestionTypeValid(isQuestionTypeValid.map((valid) => (
                    valid.id === question ? { ...valid, isValid: questionType[question].text !== '' } : valid
                  )));
                }}
                onChange={() => (
                  setIsQuestionTypeValid(isQuestionTypeValid.map((valid) => (
                    valid.id === question ? { ...valid, isValid: true } : valid
                  ))))}
                status={isQuestionTypeValid[question].isValid ? 'default' : 'error'}>
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
                    value={questionType[question].text}
                    onChange={(e) => {
                      setQuestionType(
                        questionType.map((type) => (
                          type.id === question ? { ...type, text: e.target.value } : type)),
                      );
                    }}
                    options={questionTypesList} />
                  <Info>
                    <Icon28InfoCircleOutline fill='#3F8AE0' />
                    <HiddenInfo className='hidden_info'>
                      <Text>
                        Вопрос с открытым ответом — это.... Вопрос на соотношение —
                        это....
                      </Text>
                    </HiddenInfo>
                  </Info>
                </div>
              </FormItemForNewQuiz>
            </FormLayoutGroup>
            {questionType[question].text !== '' && renderElement(questionType[question].text, question)}
          </FormLayout>
        </StyledDiv>
      ))}
    </>
  );
};

export default NewQuizStep2;
