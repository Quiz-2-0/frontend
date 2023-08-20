import React from 'react';
import styled from 'styled-components';
import {
  Title,
  Div,
  Caption,
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import StyledDiv from '../styled-components/StyledDiv';
import { IconWrapper } from './Achieves';
import { ArrowIcon } from '../styled-components/icons';
import { useGetCurrentUserQuery, useGetShortRatingsQuery } from '@/api/api';
import { SRC_BASE_URL } from '@/constants/api-url';

const RatingTitleContainer = styled(Div)`
  width: 100%;
  padding: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
`;

const UsersContainer = styled(Div)`
  padding: 0;
  height: 126px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-end;
  gap: 12px;
`;

const UserContainer = styled(Div)<{ user: boolean }>`
  position: relative;
  padding: 0;
  width: ${({ user }) => (user ? '80px' : '60px')};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: ${({ user }) => (user ? '5px' : '2px')};
`;

const RatingCircle = styled(Div)<{ user: boolean }>`
  padding: 0;
  width: ${({ user }) => (user ? '24px' : '21px')};
  height: ${({ user }) => (user ? '24px' : '21px')};
  border-radius: 50%;
  background-color: ${({ user }) => (user ? '#B2DEFF' : '#FAEFD2')};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
`;

const UserPhoto = styled.img<{ user: boolean }>`
  width: ${({ user }) => (user ? '80px' : '60px')};
  height: ${({ user }) => (user ? '80px' : '60px')};
  object-fit: cover;
  border-radius: 50%;
  overflow: hidden;
`;

const Rating: React.FC = () => {
  const { data: currentUser } = useGetCurrentUserQuery();
  const { data: shortRatings } = useGetShortRatingsQuery();

  return (
    <StyledDiv
      style={{
        width: '318px',
        height: '202px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: '24px',
      }}>
      <RatingTitleContainer>
        <Title
          style={{ textAlign: 'left' }}
          level='2'>
          Рейтинг
        </Title>
        <IconWrapper><ArrowIcon /></IconWrapper>
      </RatingTitleContainer>
      <UsersContainer>
        {shortRatings?.map((shortRating) => (
          <UserContainer
            key={shortRating.id}
            user={currentUser?.firstName === shortRating.firstName
              && currentUser.lastName === shortRating.lastName}>
            <RatingCircle user={currentUser?.firstName === shortRating.firstName
              && currentUser.lastName === shortRating.lastName}>
              <Caption>{shortRating.user_rating}</Caption>
            </RatingCircle>
            <UserPhoto
              src={`${SRC_BASE_URL}${shortRating.avatar}`}
              alt={`${shortRating.firstName} ${shortRating.lastName}`}
              user={currentUser?.firstName === shortRating.firstName
                && currentUser.lastName === shortRating.lastName} />
            <Caption
              style={{
                textAlign: 'center',
                letterSpacing: '0.06px',
              }}>
              {currentUser?.firstName === shortRating.firstName
              && currentUser.lastName === shortRating.lastName
                ? 'Вы'
                : `${shortRating.firstName} ${shortRating.lastName}`}
            </Caption>
          </UserContainer>
        ))}
      </UsersContainer>
    </StyledDiv>
  );
};

export default Rating;
