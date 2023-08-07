import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import logo from '../../images/logo/login__logo.svg';

const Logo = styled(NavLink)`
  background-image: url(${logo});
  display: block;
`;

export default Logo;
