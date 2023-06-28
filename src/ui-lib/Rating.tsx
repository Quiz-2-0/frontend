import React from 'react';
import { useNavigate } from 'react-router';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import {
  Title,
  Div,
  Text,
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import StyledDiv from './StyledDiv';

const StyledNavLink = styled(NavLink)`
  display: block;
  width: 28px;
  height: 28px;
  background-color: rgba(63, 138, 224, 0.05);
  border-radius: 4px;
  background-image: url('../images/navlink_icon.svg');
  background-size: 7px 12px;
  background-repeat: no-repeat;
  background-position: center;
`;

const UserWrapper = styled.div<{ width: number, height: number }>`
  width:${({ width }) => width}px;
  height:${({ height }) => height}px;
  border-radius: 50%;
  overflow: hidden;
`;

const User = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
`;

const Rating: React.FC = () => {
  const navigate = useNavigate();

  return (
    <StyledDiv>
      <Div
        style={{
          width: '100%',
          padding: '0',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Title
          style={{ textAlign: 'left' }}
          level='2'>
          Рейтинг
        </Title>
        <StyledNavLink to='#' />
      </Div>
      <Div>
        <div style={{
          width: '24px',
          height: '24px',
          borderRadius: '50%',
          backgroundColor: '#FFC107',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <p>20</p>
        </div>
        <UserWrapper height={80} width={80}>
          <User src='../images/derick-mckinney.png' alt='Аватар' />
        </UserWrapper>
        <Text>Вы</Text>
      </Div>
    </StyledDiv>
  );
};

export default Rating;
