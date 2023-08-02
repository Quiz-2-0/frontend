import styled from 'styled-components';
import { FormItem } from '@vkontakte/vkui';

const StyledFormItem = styled(FormItem)`
  padding: 0;
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  letter-spacing: -0.154px;

  & > .vkuiFormItem__top {
    color: #333;
  }
`;

export default StyledFormItem;
