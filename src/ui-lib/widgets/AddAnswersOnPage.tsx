/* eslint-disable react/no-array-index-key */
import React, { FC, useState } from 'react';
import {
  Checkbox,
  IconButton,
  Input,
  Text,
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import { Icon28AddCircleOutline } from '@vkontakte/icons';
import styled from 'styled-components';
import StyledFormItem from '../styled-components/StyledFormItem';

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

const StyledInput = styled(Input)`
  width: min-content;
  background-color: #fff;
  min-height: 20px;

  & > .vkuiInput__el {
    padding: 0;
    font-size: 15px;
    font-weight: 400;
    line-height: 20px;
    height: 20px;
    min-width: 118px;
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

const StyledCheckbox = styled(Checkbox)`
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

  & > .vkuiCheckbox__icon {
    margin-right: 8px;
  }

  & > .vkuiCheckbox__content > .vkuiCheckbox__title {
    margin: 0;
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
  title: string,
  description: string,
  placeholder: string,
}> = ({ title, description, placeholder }) => {
  const [answers, setAnswers] = useState<string[]>(['']);
  const [isAnswerValid, setIsAnswerValid] = useState(true);
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
      <AddAnswers>
        {answers.map((answer, i) => (
          <StyledCheckbox key={i}>
            <StyledInput
              id='answer'
              type='text'
              placeholder={placeholder}
              status={isAnswerValid ? 'default' : 'error'}
              onBlur={() => setIsAnswerValid(answer !== '')}
              name='answer'
              value={answer}
              onChange={(e) => {
                setAnswers(answers.map((answ, ind) => (
                  i === ind ? e.target.value : answ
                )));
              }} />
          </StyledCheckbox>
        ))}
        <IconButton
          aria-label='Добавить ответ'
          onClick={() => setAnswers([...answers, ''])}>
          <Icon28AddCircleOutline fill='#3F8AE0' />
        </IconButton>
      </AddAnswers>
    </FormItemForNewQuiz>
  );
};

export default AddAnswersOnPage;
