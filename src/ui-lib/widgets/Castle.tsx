import React from 'react';
import { useNavigate } from 'react-router';
import {
  Title,
  Text,
  Button,
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import styled from 'styled-components';
import StyledDiv from '../styled-components/StyledDiv';
import { setFromCastle } from '@/store/allSlice/allSlice';
import { useGetAllQuizzesQuery, useGetCurrentUserQuery } from '@/api/api';
import { useDispatch } from '@/store/store.types';
import { pluralsFull } from '@/constants/plurals';
import { SRC_BASE_URL } from '@/constants/api-url';

const StyledImage = styled.img`
  max-width: 310px;
  height: 200px;
  width: 100%;
  background: none;
  padding: 0;
  object-fit: cover;
`;

const StyledButton = styled(Button)`
  max-width: 286px;
  margin: 30px auto 0;
  height: 40px;
  border-radius: 4px;

  & > .vkuiButton__in > .vkuiButton__content {
    font-size: 15px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px;
    letter-spacing: -0.24px;
  }
`;

const StyledText = styled(Text)`
  text-align: center;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  color: #000000;
  white-space: pre-wrap;
`;

const Castle: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data } = useGetAllQuizzesQuery();
  const { data: currentUser } = useGetCurrentUserQuery();

  const onButtonClick = () => {
    dispatch(data?.find(({ appointed }) => appointed === true)
      ? setFromCastle(true)
      : setFromCastle(false));
    navigate('/quizzes');
  };

  return (
    <StyledDiv style={{
      maxWidth: '358px', width: '100%', height: '450px',
    }}>
      <StyledText>{`Осталось пройти ${pluralsFull.quizzes(currentUser?.to_next_level ?? 0)}\nдо следующего уровня`}</StyledText>
      <Title
        style={{ textAlign: 'center', padding: '24px 0 16px' }}
        level='1'>
        {currentUser?.level_description}
      </Title>
      <StyledImage
        src={`${SRC_BASE_URL}/media/${currentUser?.level_image}`}
        style={{}} />
      <StyledButton
        type='button'
        size='l'
        onClick={onButtonClick}
        stretched>
        Продолжить строить
      </StyledButton>
    </StyledDiv>
  );
};

export default Castle;
