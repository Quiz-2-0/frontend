import { Button } from '@vkontakte/vkui';
import styled from 'styled-components';

const StyledBackAndForwardButton = styled(Button)`
  width: min-content;
  height: 24px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 15px;
  font-weight: 400;
  line-height: 20px;

  & > .vkuiButton__in > .vkuiButton__content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: no-wrap;
    width: 100%;
    gap: 8px;
  }
`;

export default StyledBackAndForwardButton;
