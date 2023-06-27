import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import logo from '../images/company-logo.svg';

const Logo = styled(NavLink)`
  background-image: url(${logo});
  display: block;
  width: 155px;
  height: 95px;
`;

export default Logo;
