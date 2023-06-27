import React from 'react';
import { useNavigate } from 'react-router';
import { NavLink } from 'react-router-dom';

const Header: React.FC = () => {
  const navigate = useNavigate();
  return (
    <NavLink className='logo' to='/' />
  );
};

export default Header;
