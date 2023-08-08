import React, { FC } from 'react';
import { useNavigate } from 'react-router';
import { Div, Title } from '@vkontakte/vkui';
import styled from 'styled-components';
import StyledButton from '../ui-lib/styled-components/StyledButton';
import imgPage404 from '../images/page_404.svg';

const StyledDiv = styled(Div)`
  box-sizing: border-box;
  max-width: 100%;
  width: 576px;
  margin: 0 auto;
  text-align: center;
`;

const Img = styled.img`
  max-width: 100%;
  margin-bottom: 50px;
`;

const P = styled.p`
  margin: 12px auto;
`;

const ButtonHome = styled(StyledButton)`
  display: block;
  margin: 24px auto 0;
`;

const Error: FC = () => {
  const navigate = useNavigate();

  const onButtonHomeClick = () => {
    navigate('/');
  };

  return (
    <Div>
      <StyledDiv>
        {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
        <Img src={imgPage404} alt='404' />
        <Title
          level='1'>
          Страница не найдена
        </Title>
        <P>
          То, что вы ищете, не существует или пока ещё не построено.
        </P>
        <ButtonHome
          type='submit'
          onClick={onButtonHomeClick}
          size='l'>
          На главную
        </ButtonHome>
      </StyledDiv>
    </Div>
  );
};

export default Error;
