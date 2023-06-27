import styled from 'styled-components';
import { Input } from '@vkontakte/vkui';

const StyledInput = styled(Input)`
  font-size: 16px;
  height: 40px;
  background-color: #F7F8FA;

  &:-webkit-autofill,
  &:hover:-webkit-autofill,
  &:focus:-webkit-autofill,
  &:active:-webkit-autofill {
  box-shadow: 0 0 0 30px white inset !important;
  }
`;

export default StyledInput;
