/* eslint-disable @typescript-eslint/no-unsafe-call */
import React, { FC, useEffect } from 'react';
import { FormLayoutGroup, IconButton, Text, Textarea, Title } from '@vkontakte/vkui';
import { Icon28DeleteOutline } from '@vkontakte/icons';
import StyledInput from '@/ui-lib/styled-components/StyledInput';
import StyledDiv from '@/ui-lib/styled-components/StyledDiv';
import FormItemForNewQuiz from '@/ui-lib/styled-components/FormItemForNewQuiz';
import { FormElements, SetFormElements, StepProps } from '@/constants/steps';

const NewQuizStep3: FC<StepProps> = ({
  items,
  setItems,
  formElements,
  setFormElements,
  isSubmit,
  setNextPage,
  setIsSubmit,
}) => {
  useEffect(() => {
    if (isSubmit[2]) {
      setNextPage();
      setIsSubmit([false, false, false, false]);
    }
  }, [isSubmit]);

  return (
    <>
      {items.map((question, i) => (
        <StyledDiv key={question} style={{ height: 'min-content', marginTop: '24px' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              marginBottom: '36px',
            }}>
            <Title
              level='3'
              style={{
                color: '#818C99',
                fontSize: '16px',
                fontWeight: '500',
                lineHeight: '20px',
                letterSpacing: '-0.32px',
              }}>
              {`Тема №${1}`}
            </Title>
            <IconButton
              style={{ width: '28px', height: '28px' }}
              aria-label='Удалить тему'>
              <Icon28DeleteOutline fill='#99A2AD' />
            </IconButton>
          </div>
          <FormLayoutGroup style={{ padding: 0 }}>

            <FormItemForNewQuiz
              htmlFor='theme-name'
              top='Тема'
              style={{
                maxWidth: '546px',
                marginBottom: '28px',
              }}>
              <Text
                style={{
                  color: 'var(--steel-gray-500, #6F7985)',
                  fontFamily: 'SFProDisplay',
                  fontSize: '14px',
                  fontStyle: 'normal',
                  fontWeight: '400',
                  lineHeight: '18px',
                  letterSpacing: '-0.154px',
                  marginBottom: '20px',
                }}>
                Введите варианты ответов и отметьте правильный
                введите варианты ответов и отметьте правильный...
                введите варианты ответов и отметьте правильный...
              </Text>
              <StyledInput
                style={{ minHeight: '40px' }}
                id='theme-name'
                type='text'
                placeholder='Введите название темы'
                name='theme-name' />
            </FormItemForNewQuiz>

            <FormItemForNewQuiz
              htmlFor='description'
              top='Описание'
              style={{
                boxSizing: 'border-box',
              }}>
              <Textarea
                style={{ minHeight: '120px', alignItems: 'flex-start' }}
                placeholder='Введите текст' />
            </FormItemForNewQuiz>

          </FormLayoutGroup>
        </StyledDiv>
      ))}
    </>
  );
};

export default NewQuizStep3;
