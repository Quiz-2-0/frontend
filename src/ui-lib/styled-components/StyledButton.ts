import styled from 'styled-components';
import { Button } from '@vkontakte/vkui';

const StyledButton = styled(Button)`
  height: 40px;
  margin-top: 36px;
  border-radius: 4px;

  & > .vkuiButton__in > .vkuiButton__content {
    display: flex;
    justify-content: space-between;
    alignItems: center;
    gap: 8px;
    font-size: 15px;
    line-height: 20px;
    font-weight: 500;
    letter-spacing: -0.24px;
  }
`;

export default StyledButton;
