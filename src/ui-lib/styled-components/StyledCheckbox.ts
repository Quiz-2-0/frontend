import styled from 'styled-components';
import { Checkbox } from '@vkontakte/vkui';

const StyledCheckbox = styled(Checkbox)`
  min-height: 24px;
  height: 24px;
  margin-left: 0 !important;
  margin-right: 0 !important;
  padding: 0;

  &:hover {
    background: none;
  }

  & > .vkuiCheckbox__icon {
    margin-right: 24px;
  }

  & > .vkuiCheckbox__content > .vkuiCheckbox__title {
    margin: 0;
  }

  & > .vkuiCheckbox__content > .vkuiCheckbox__title > span {
    margin: 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 24px;
  }
`;

export default StyledCheckbox;
