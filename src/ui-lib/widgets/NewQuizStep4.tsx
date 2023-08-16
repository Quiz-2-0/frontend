/* eslint-disable ternary/no-unreachable */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable array-callback-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { FC, useState } from 'react';
import { FormLayout, FormLayoutGroup, Select, Text } from '@vkontakte/vkui';
import { Icon56GalleryOutline } from '@vkontakte/icons';
import styled from 'styled-components';
import StyledFormItem from '../styled-components/StyledFormItem';
import timeList from '@/constants/time';
import thresholdList from '@/constants/threshold';
import StyledDiv from '../styled-components/StyledDiv';
import StyledButton from '../styled-components/StyledButton';
import GalleryPopup from '../popups/GalleryPopup';
import gallery from '@/constants/gallery';

const FormItemForNewQuiz = styled(StyledFormItem)`
  padding-top: 28px;

  & > .vkuiFormItem__top {
    font-size: 15px;
    font-weight: 500;
    line-height: 20px;
    color: #000000;
    padding-bottom: 8px;
  }
`;

const StyledSelect = styled(Select)`
  & > .vkuiSelect {
    min-height: 40px;
  }
`;

const DownloadCover = styled.div<{ background: number }>`
  margin-top: 12px;
  max-width: 330px;
  width: 100%;
  min-height: 192px;
  padding: 20px;
  box-sizing: border-box;
  border-radius: 8px;
  background: ${({ background }) => (background === -1 ? '#EDEEF0;' : `url(${gallery[background].image});
  background-position: center;
  background-size: cover;`)}
`;

const NewQuizStep4: FC = () => {
  const [time, setTime] = useState('0');
  const [isTimeValid, setIsTimeValid] = useState(true);
  const [threshold, setThreshold] = useState(70);
  const [image, setImage] = useState(-1);
  const [isImageValid, setIsImageValid] = useState(true);
  const [isGalleryPopupOpen, setIsGalleryPopupOpen] = useState(false);

  return (
    <StyledDiv>
      <FormLayout>
        <FormLayoutGroup mode='horizontal' style={{ padding: 0 }}>
          <FormItemForNewQuiz
            htmlFor='time'
            top='Время прохождения'
            onBlur={() => setIsTimeValid(time.length !== 0)}
            onChange={() => setIsTimeValid(true)}
            status={isTimeValid ? 'default' : 'error'}
            style={{ maxWidth: '499px' }}>
            <Text
              style={{
                color: '#6F7985',
                fontSize: '14px',
                fontWeight: '400',
                lineHeight: '18px',
                letterSpacing: '-0.154px',
                paddingBottom: '20px',
              }}>
              Оцените примерное время прохождения квиза
            </Text>
            <StyledSelect
              placeholder='Выберите значение'
              value={time}
              onChange={(e) => setTime(e.target.value)}
              options={timeList} />
          </FormItemForNewQuiz>
          <FormItemForNewQuiz
            htmlFor='threshold'
            top='Порог прохождения'
            style={{ width: '100%', marginLeft: '28px' }}>
            <Text
              style={{
                color: '#6F7985',
                fontSize: '14px',
                fontWeight: '400',
                lineHeight: '18px',
                letterSpacing: '-0.154px',
                paddingBottom: '20px',
              }}>
              Задайте собственный порог, по умолчанию — это 70% правильных ответов
            </Text>
            <StyledSelect
              placeholder='Выберите значение'
              value={threshold}
              onChange={(e) => setThreshold(Number(e.target.value))}
              options={thresholdList} />
          </FormItemForNewQuiz>
        </FormLayoutGroup>
        <FormItemForNewQuiz
          htmlFor='image'
          top='Обложка квиза'
          onBlur={() => setIsImageValid(image !== -1)}
          onChange={() => setIsTimeValid(true)}
          status={isImageValid ? 'default' : 'error'}
          style={{ maxWidth: '499px' }}>
          <DownloadCover
            background={image}>
            {image === -1 && <Icon56GalleryOutline width={114} height={114} fill='#fff' style={{ margin: '0 auto' }} />}
            <StyledButton
              style={{
                display: 'block',
                maxWidth: 'min-content',
                margin: `${image === -1 ? '6' : '120'}px auto 0`,
              }}
              onClick={() => setIsGalleryPopupOpen(true)}>
              {image === -1 ? 'Выбрать обложку' : 'Заменить обложку'}
            </StyledButton>
          </DownloadCover>
        </FormItemForNewQuiz>
      </FormLayout>
      <GalleryPopup
        isGalleryPopupOpen={isGalleryPopupOpen}
        setIsGalleryPopupOpen={setIsGalleryPopupOpen}
        image={image}
        setImage={setImage} />
    </StyledDiv>
  );
};

export default NewQuizStep4;
