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
import questionTypes from '@/constants/question-types';
import StyledDiv from '../styled-components/StyledDiv';

const FormItemForNewQuiz = styled(StyledFormItem)`
  & > .vkuiFormItem__top {
    font-size: 15px;
    font-weight: 500;
    line-height: 20px;
    color: #000000;
    padding-bottom: 20px;
  }
`;

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

const NewQuizStep2: FC<{ items: number[]; setItems: any }> = ({
  items,
  setItems,
}) => {
  const [questionText, setQuestionText] = useState('');
  const [isQuestionTextValid, setIsQuestionTextValid] = useState(true);
  const [questionType, setQuestionType] = useState('');
  const [isQuestionTypeValid, setIsQuestionTypeValid] = useState(true);

  const onChange = (e: { currentTarget: { name: any; value: any } }) => {
    const { name, value } = e.currentTarget;
    [
      { text: 'question-text', method: setQuestionText },
      { text: 'question-type', method: setQuestionType },
    ].map(({ text, method }) => {
      if (name === text) {
        method(value);
      }
    });
  };

  const renderElement = () => {
    const type = questionTypes.find(({ name }) => name === questionType);
    if (!type) {
      return null;
    }
    return <type.markup.Component />;
  };

  return (
    <>
      {items.map((question) => (
        <StyledDiv key={question} style={{ height: 'min-content' }}>
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
                onClick={() => setItems(items.filter((item) => item !== question))}>
                <Icon28DeleteOutline fill='#99A2AD' />
              </IconButton>
            </div>
            <FormLayoutGroup mode='horizontal' style={{ padding: 0 }}>
              <FormItemForNewQuiz
                htmlFor='question-text'
                top='Текст вопроса'
                onBlur={() => {
                  setIsQuestionTextValid(
                    questionText.length > 3 && questionText.length < 100,
                  );
                }}
                onChange={() => setIsQuestionTextValid(true)}
                status={isQuestionTextValid ? 'default' : 'error'}
                style={{ minWidth: '546px' }}>
                <StyledInput
                  style={{ minHeight: '40px' }}
                  id='question-text'
                  type='text'
                  placeholder='Введите вопрос'
                  name='question-text'
                  value={questionText}
                  onChange={onChange} />
              </FormItemForNewQuiz>
              <FormItemForNewQuiz
                htmlFor='question-type'
                top='Тип вопроса'
                onBlur={() => {
                  setIsQuestionTypeValid(questionType !== '');
                }}
                onChange={() => setIsQuestionTypeValid(true)}
                status={isQuestionTypeValid ? 'default' : 'error'}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '12px',
                  }}>
                  <StyledSelect
                    placeholder='Выберите тип вопроса'
                    value={questionType}
                    onChange={(e) => setQuestionType(e.target.value)}
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
            {questionType !== '' && renderElement()}
          </FormLayout>
        </StyledDiv>
      ))}
    </>
  );
};

export default NewQuizStep2;
