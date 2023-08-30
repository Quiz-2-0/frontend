/* eslint-disable no-nested-ternary */
/* eslint-disable ternary/nesting */
/* eslint-disable react/require-default-props */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import React, { FC, useState, useEffect } from 'react';
import {
  Checkbox,
  IconButton,
  Input,
  Text,
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import { Icon16CancelCircleOutline, Icon20ChevronRight, Icon28AddCircleOutline } from '@vkontakte/icons';
import styled from 'styled-components';
import StyledFormItem from '../styled-components/StyledFormItem';
import StyledButton from '../styled-components/StyledButton';
import DragAndDropQuestion from '@/ui-lib/widgets/DragAndDropQuestion';
import { IQuestionAdmin } from '@/types/types';

const FormItemForNewQuiz = styled(StyledFormItem)`
  padding-top: 28px;

  & > .vkuiFormItem__top {
    font-size: 15px;
    font-weight: 500;
    line-height: 20px;
    color: #000000;
    padding-bottom: 8px;
  }
`;

const StyledInput = styled(Input)<{ value: string, placeholder: string }>`
  width: min-content;
  background-color: #fff;
  min-height: 20px;

  & > .vkuiInput__el {
    transition: all .3s ease;
    padding: 0;
    font-size: 15px;
    font-weight: 400;
    line-height: 20px;
    height: 20px;
    min-width: 30px;
    width: ${({ value, placeholder }) => (
    value === '' ? placeholder.length * 15 * 0.55 : value.length * 15 * 0.53
  )}px;
    max-width: 930px;
  }
  & > .vkuiFormField__border {
    border: none;
  }

  .vkuiFocusVisible--mode-outline {
    border: none;
  }

  &:-webkit-autofill,
  &:hover:-webkit-autofill,
  &:focus:-webkit-autofill,
  &:active:-webkit-autofill {
    box-shadow: 0 0 0 30px white inset !important;
  }
`;

const StyledCheckbox = styled(Checkbox)<{ questionType: string }>`
  width: min-content !important;
  min-height: 52px;
  box-sizing: border-box !important;
  margin-left: 0 !important;
  margin-right: 0 !important;
  padding: 16px;
  border-radius: 6px;
  border: 1px solid #DCE1E6;

  &:hover {
    background: rgba(63, 138, 224, 0.05);

    .vkuiInput {
      background: rgba(63, 138, 224, 0.05);
    }
  }

  & > .vkuiCheckbox__input:checked~.vkuiCheckbox__icon--on {
    ${({ questionType }) => (questionType === 'LST' ? 'display: none;' : '')}
  }

  & > .vkuiCheckbox__icon {
    ${({ questionType }) => (questionType === 'LST' ? 'display: none;' : '')}
    margin-right: 8px;
  }

  & > .vkuiCheckbox__content > .vkuiCheckbox__title {
    margin: 0;
  }

  & > .vkuiCheckbox__content > .vkuiCheckbox__title > span {
    display: flex;
    gap: 8px;
    align-items: center;
  }
`;

const AddAnswers = styled.div`
  width: 100%;
  max-width: 1026px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
`;

const AddAnswersOnPage: FC<{
  question: IQuestionAdmin | undefined,
  questionsList: IQuestionAdmin[] | undefined,
  setQuestionsList: any,
  questionType: string,
  title: string,
  description: string,
  placeholder: string,
  answers: { id: number, text: string, is_right?: boolean }[],
  setAnswers?: any,
  isAnswerValid?: { id: number, isValid: boolean }[],
  setIsAnswerValid?: any,
  categories?: { id: number, text: string, items: { id: number, text: string }[] }[],
}> = ({
  question,
  questionsList,
  setQuestionsList,
  questionType,
  title,
  description,
  placeholder,
  answers,
  setAnswers,
  isAnswerValid,
  setIsAnswerValid,
  categories,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteButtonDisable, setIsDeleteButtonDisabled] = useState(true);
  useEffect(() => {
    if (categories?.length === 0 || answers.length === 0) {
      setIsOpen(false);
    }
  }, [categories, answers]);

  return (
    <FormItemForNewQuiz
      top={title}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignContent: 'center',
          flexWrap: 'wrap',
        }}>
        <Text
          style={{
            color: '#6F7985',
            fontSize: '14px',
            fontWeight: '400',
            lineHeight: '18px',
            letterSpacing: '-0.154px',
            paddingBottom: '20px',
          }}>
          {description}
        </Text>
      </div>
      {placeholder !== ''
        ? (
          <AddAnswers>
            {answers.map((answer) => (
              <StyledCheckbox
                questionType={questionType}
                checked={answer.is_right}
                onClick={() => {
                  questionType === 'ONE'
                    ? setAnswers(answers.map((answ) => (
                      answ.id === answer.id
                        ? answer.is_right !== true
                          ? { ...answ, is_right: true }
                          : { ...answ, is_right: false }
                        : { ...answ, is_right: false })))
                    : setAnswers(answers.map((answ) => (
                      answ.id === answer.id && questionType !== 'LST'
                        ? { ...answ, is_right: !answer.is_right } : answ)));
                }}
                key={answer.id}>
                <StyledInput
                  id='answer'
                  type='text'
                  placeholder={placeholder}
                  status={isAnswerValid && isAnswerValid[answer.id].isValid ? 'default' : 'error'}
                  onBlur={() => {
                    setIsAnswerValid(isAnswerValid?.map((valid) => (
                      valid.id === answer.id ? { ...valid, isValid: answer.text !== '' } : valid)));
                    setIsDeleteButtonDisabled(false);
                  }}
                  name='answer'
                  value={answer.text}
                  onFocus={() => setIsDeleteButtonDisabled(true)}
                  onChange={(e) => {
                    setIsDeleteButtonDisabled(true);
                    setAnswers(answers.map((answ) => (
                      answer.id === answ.id ? { ...answ, text: e.target.value } : answ
                    )));
                  }} />
                {answer.text !== '' && (
                  <IconButton
                    disabled={isDeleteButtonDisable}
                    style={{ width: '16px', height: '16px', paddingTop: '2px' }}
                    aria-label='Удалить ответ'
                    onClick={() => {
                      const arrWithoutVariant = answers.filter((answ) => answ.id !== answer.id);
                      const arrValidationWithoutVariant = isAnswerValid?.filter((valid) => (
                        valid.id !== answer.id));
                      setAnswers(arrWithoutVariant.map((answ, ind) => ({ ...answ, id: ind })));
                      setIsAnswerValid(arrValidationWithoutVariant?.map((val, ind: number) => (
                        { ...val, id: ind })));
                    }}>
                    <Icon16CancelCircleOutline fill='#99A2AD' />
                  </IconButton>
                )}
              </StyledCheckbox>
            ))}
            <IconButton
              disabled={answers.some(({ text }) => text === '')}
              aria-label='Добавить ответ'
              onClick={() => {
                setAnswers(questionType !== 'LST'
                  ? [...answers, { id: answers.length, text: '' }]
                  : title === 'Категории для соотношений'
                    ? [...answers, { id: answers.length, text: '', items: [] }]
                    : [...answers, { id: answers.length, text: '' }]);
                isAnswerValid && setIsAnswerValid(
                  [...isAnswerValid, { id: isAnswerValid?.length, isValid: true }],
                );
              }}>
              <Icon28AddCircleOutline fill='#3F8AE0' />
            </IconButton>
          </AddAnswers>
        ) : (
          isOpen ? (
            <DragAndDropQuestion
              question={question}
              questionsList={questionsList}
              setQuestionsList={setQuestionsList}
              boardTitles={categories ?? [{ id: 0, text: '', items: [] }]}
              answersList={answers} />
          ) : (
            (categories?.length ?? 0) > 1 && answers.length > 1 && (
              <StyledButton
                onClick={() => {
                  setIsOpen(true);
                  setIsDeleteButtonDisabled(true);
                }}
                mode='link'
                style={{
                  display: 'flex',
                  gap: '8px',
                  alignItems: 'center',
                  marginTop: '22px',
                }}>
                Соотнесите элементы
                <Icon20ChevronRight />
              </StyledButton>
            )
          )
        )}
    </FormItemForNewQuiz>
  );
};

export default AddAnswersOnPage;
