import styled from 'styled-components';
import StyledFormItem from './StyledFormItem';

const FormItemForNewQuiz = styled(StyledFormItem)`
  & > .vkuiFormItem__top {
    font-size: 15px;
    font-weight: 500;
    line-height: 20px;
    color: #000000;
    padding-bottom: 20px;
  }
`;

export default FormItemForNewQuiz;
