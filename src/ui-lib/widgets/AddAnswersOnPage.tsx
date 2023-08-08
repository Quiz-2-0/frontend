import React, { FC, useState } from 'react';
import { Text } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
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

const AddAnswersOnPage: FC<{ title: string, description: string }> = ({ title, description }) => {
  const [answers, setAnswers] = useState([0]);
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
    </FormItemForNewQuiz>
  );
};

export default AddAnswersOnPage;
