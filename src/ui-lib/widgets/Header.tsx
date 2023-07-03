/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable ternary/no-unreachable */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import ClickAwayListener from 'react-click-away-listener';
import Logo from '../Logo';
import { BellIcon, RedBallIcon, LogOuticon } from '../icons';
import ava from '../../images/avatar/header_derick-mckinney.png';
import logoImg from '../../images/logo/header__logo.svg';
import { useSelector, useDispatch } from '../../store/store.types';
import AdvBanner from './AdvBanner';
import { useGetCurrentUserQuery, jwt, useGetAllQuizesQuery } from '../../api/apiv2';

const HeaderWrapper = styled.header`
  width: 100%;
  padding-top: 32px;
  box-sizing: border-box;
`;
const UpdatedLogo = styled(Logo)`
  background-image: url(${logoImg});
  width: 71px;
  height: 71px;
  background-repeat: no-repeat;
  background-position: center;
`;
const HeaderContainer = styled.div`
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  box-sizing: border-box;
  justify-content: space-between;
  align-items: center;
  position: relative;
`;

const ToolBar = styled.div`
  display: flex;
  align-items: center;

`;
const AvatarWrapper = styled.div<{ width: number, height: number }>`
  width:${({ width }) => width}px;
  height:${({ height }) => height}px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 8px;
  cursor: pointer;
`;
const Avatar = styled.img``;

const UserName = styled.p`
  font-size: 14px;
  font-family: 'SFProDisplay';
  line-height: 18px;
  letter-spacing: -0.154px;
  font-weight: 400;
  color: #000;
  margin: 0;
  align-self: center;
  margin-right: 24px;
`;

const IconWrapper = styled.div`
  position: relative;
  width: 28px;
  height: 28px;
  margin-right: 24px;
  cursor: pointer;
`;

const Header: FC = () => {
  const navigate = useNavigate();
  const { data } = useGetCurrentUserQuery();
  /// нужно убрать этот ранний запрос за квизами
  const { data: quizes } = useGetAllQuizesQuery();
  const [isOpen, openModal] = useState(false);
  const logOutFunction = () => {
    const isRemember = localStorage.getItem('isRemember') === 'true';
    jwt.remove(isRemember);
    navigate('/login');
  };
  useEffect(() => {
    document.addEventListener('click', (e: any) => {
      if (e.target!.closest('.banner') === null) { openModal(false); }
    });
  }, []);

  return (
    <HeaderWrapper>
      <HeaderContainer>

        <AdvBanner isOpen={isOpen} />

        <UpdatedLogo to='/' />
        <ToolBar>
          <AvatarWrapper width={60} height={60}>
            <Avatar src={data?.avatar} alt='тут лицо чувака' />
          </AvatarWrapper>
          <UserName>{data?.firstName}</UserName>
          <IconWrapper>
            <BellIcon onClick={(e: any) => { e.stopPropagation(); openModal(!isOpen); }} />
            {quizes && <RedBallIcon top={3} left={17} />}
          </IconWrapper>
          <LogOuticon onClick={logOutFunction} />
        </ToolBar>
      </HeaderContainer>
    </HeaderWrapper>
  );
};

export default Header;
