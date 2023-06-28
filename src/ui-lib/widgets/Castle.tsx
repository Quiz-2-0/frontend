/* eslint-disable ternary/no-unreachable */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react';
import { useNavigate } from 'react-router';
import {
  Title,
  Div,
  FormItem,
  Image,
  Progress,
  Button,
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import StyledDiv from '../StyledDiv';
import grandmothersHouse from '../../images/houses/grandmothers-house.png';

const Castle: React.FC = () => {
  const navigate = useNavigate();
  const number = 1;
  const progressArr = [100, 100, 100, 100, 0];
  const name = 'У бабушки в деревне';

  return (
    <StyledDiv style={{ maxWidth: '358px', width: '100%', minHeight: '430px' }}>
      <Title
        style={{ textAlign: 'center', paddingBottom: '16px' }}
        level='2'>
        {name}
      </Title>
      <Image
        src={grandmothersHouse}
        size={310}
        withBorder={false}
        style={{
          background: 'none',
          minHeight: '214px',
          padding: '0',
        }} />
      <FormItem
        style={{ padding: '24px 16px', textAlign: 'center' }}
        top={`до следующего уровня остался ${number} квиз`}>
        <Div
          style={{
            padding: '0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: '8px',
            gap: '1px',
          }}>
          {progressArr.map((progressValue: number, i: number) => (
            <Progress
              aria-labelledby='progresslabel'
              value={progressValue}
              style={{
                width: '100%',
                height: '100%',
                borderTopLeftRadius: `${i === 0 ? '8px' : '0'}`,
                borderBottomLeftRadius: `${i === 0 ? '8px' : '0'}`,
                borderTopRightRadius: `${i === progressArr.length - 1 ? '8px' : '0'}`,
                borderBottomRightRadius: `${i === progressArr.length - 1 ? '8px' : '0'}`,
              }} />
          ))}
        </Div>
      </FormItem>
      <Button
        style={{ maxWidth: '286px', margin: '0 auto', height: '40px' }}
        type='button'
        size='l'
        onClick={() => navigate('/quizes')}
        stretched>
        Продолжить строить
      </Button>
    </StyledDiv>
  );
};

export default Castle;
