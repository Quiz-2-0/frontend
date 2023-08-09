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
import StyledFormItem from '../styled-components/StyledFormItem';
import StyledInput from '../styled-components/StyledInput';
import questionTypes from '../../constants/question-types';
import StyledDiv from '../styled-components/StyledDiv';
import { FormElements, SetFormElements } from '../../constants/steps';
import FormItemForNewQuiz from '../styled-components/FormItemForNewQuiz';

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
  const questionText = formElements.questionText as string[];
  const { setQuestionText } = setFormElements;
  const questionType = formElements.questionType as string[];
  const { setQuestionType } = setFormElements;
  const isQuestionTextValid = formElements.isQuestionTextValid as boolean[];
  const { setIsQuestionTextValid } = setFormElements;
  const isQuestionTypeValid = formElements.isQuestionTypeValid as boolean[];
  const { setIsQuestionTypeValid } = setFormElements;

  const renderElement = () => {
    const type = questionTypes.find(({ name }) => questionType.includes(name));
    if (!type) {
      return null;
    }
    return <type.markup.Component />;
  };

  return (
    <>
      {items.map((question, i) => (
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
                {`Вопрос №${i + 1}`}
              </Text>
              <IconButton
                style={{ width: '28px', height: '28px' }}
                aria-label='Удалить вопрос'
                onClick={() => {
                  setItems(items.filter((item) => item !== question));
                  setQuestionText(
                    questionText.filter((name: string) => (
                      name !== questionText[question])),
                  );
                  setQuestionType(
                    questionType.filter((type: string) => (
                      type !== questionType[question])),
                  );
                  setIsQuestionTextValid(
                    isQuestionTextValid.filter((valid: boolean, ind: number) => (
                      ind !== question)),
                  );
                  setIsQuestionTypeValid(
                    isQuestionTypeValid.filter((valid: boolean, ind: number) => (
                      ind !== question)),
                  );
                }}>
                <Icon28DeleteOutline fill='#99A2AD' />
              </IconButton>
            </div>
            <FormLayoutGroup mode='horizontal' style={{ padding: 0 }}>
              <FormItemForNewQuiz
                htmlFor='question-text'
                top='Текст вопроса'
                onBlur={() => {
                  setIsQuestionTextValid(isQuestionTextValid.map((valid, ind) => (
                    ind === question ? questionText[question] !== '' : valid
                  )));
                }}
                onChange={() => setIsQuestionTextValid(
                  isQuestionTextValid.map((valid, ind) => (
                    question === ind ? true : valid
                  )),
                )}
                status={isQuestionTextValid[question] ? 'default' : 'error'}
                style={{ maxWidth: '546px' }}>
                <StyledInput
                  style={{ minHeight: '40px' }}
                  id='question-text'
                  type='text'
                  placeholder='Введите вопрос'
                  name='question-text'
                  value={questionText[question]}
                  onChange={(e) => {
                    setQuestionText(
                      questionText.map((text, ind) => (
                        ind === question ? e.target.value : text)),
                    );
                  }} />
              </FormItemForNewQuiz>
              <FormItemForNewQuiz
                htmlFor='question-type'
                top='Тип вопроса'
                onBlur={() => {
                  setIsQuestionTypeValid(isQuestionTypeValid.map((valid, ind) => (
                    ind === question ? questionType[question] !== '' : valid
                  )));
                }}
                onChange={() => setIsQuestionTypeValid(isQuestionTypeValid.map((valid, ind) => (
                  ind === question ? questionType[question] !== '' : valid
                )))}
                status={isQuestionTypeValid[question] ? 'default' : 'error'}>
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
                    value={questionType[question]}
                    onFocus={(e) => {
                      setQuestionType(
                        questionType.map((type, ind) => (
                          ind === question ? e.target.value : type)),
                      );
                    }}
                    onChange={(e) => {
                      setQuestionType(
                        questionType.map((type, ind) => (
                          ind === question ? e.target.value : type)),
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
            {questionType[question] !== '' && renderElement()}
          </FormLayout>
        </StyledDiv>
      ))}
    </>
  );
};

export default NewQuizStep2;
