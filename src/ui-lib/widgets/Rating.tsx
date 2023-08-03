/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React from 'react';
import styled from 'styled-components';
import {
  Title,
  Div,
  Text,
  Subhead,
  Caption,
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import StyledDiv from '../StyledDiv';
import { IconWrapper } from './Achives';
import { ArrowIcon } from '../icons';
import beforeUser from '../../images/avatar/mayakovsky.png';
import afterUser from '../../images/avatar/dostoevskij.png';
import { useGetCurrentUserQuery } from '../../api/apiv2';

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
  const { data, error } = useGetCurrentUserQuery();

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
      <Div
        style={{
          width: '100%',
          padding: '0',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '12px',
        }}>
        <Title
          style={{ textAlign: 'left' }}
          level='2'>
          Рейтинг
        </Title>
        <IconWrapper><ArrowIcon /></IconWrapper>
      </Div>
      <Div
        style={{
          padding: '0',
          width: '224px',
          height: '126px',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
        }}>
        <Div
          style={{
            position: 'relative',
            width: '60px',
            padding: '0',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            gap: '2px',
          }}>
          <Div style={{
            padding: '0',
            width: '21px',
            height: '21px',
            borderRadius: '50%',
            backgroundColor: '#FAEFD2',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            top: '0',
            left: '0',
          }}>
            <Caption>21</Caption>
          </Div>
          <UserWrapper height={60} width={60}>
            <User src={beforeUser} alt='Аватар' />
          </UserWrapper>
          <Caption
            style={{
              textAlign: 'center',
              letterSpacing: '0.06px',
            }}>
            Владимир Маяковский
          </Caption>
        </Div>
        <Div
          style={{
            position: 'relative',
            width: '80px',
            padding: '0',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            alignSelf: 'flex-start',
            gap: '5px',
          }}>
          <Div style={{
            padding: '0',
            width: '24px',
            height: '24px',
            borderRadius: '50%',
            backgroundColor: '#B2DEFF',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            top: '0',
            left: '0',
          }}>
            <Text>20</Text>
          </Div>
          <UserWrapper height={80} width={80}>
            <User src={`http://80.87.106.133/${data?.avatar}`} alt='Аватар' />
          </UserWrapper>
          <Subhead>Вы</Subhead>
        </Div>
        <Div
          style={{
            position: 'relative',
            width: '60px',
            padding: '0',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            gap: '2px',
          }}>
          <Div style={{
            padding: '0',
            width: '21px',
            height: '21px',
            borderRadius: '50%',
            backgroundColor: '#FAEFD2',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            top: '0',
            left: '0',
          }}>
            <Caption>19</Caption>
          </Div>
          <UserWrapper height={60} width={60}>
            <User src={afterUser} alt='Аватар' />
          </UserWrapper>
          <Caption
            style={{
              textAlign: 'center',
              letterSpacing: '0.06px',
            }}>
            Фёдор Достоевский
          </Caption>
        </Div>
      </Div>
    </StyledDiv>
  );
};

export default Rating;
