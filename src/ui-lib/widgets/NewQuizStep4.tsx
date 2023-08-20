/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import React, { FC, useEffect, useState } from 'react';
import { FormLayout, FormLayoutGroup, Select, Text } from '@vkontakte/vkui';
import { Icon56GalleryOutline } from '@vkontakte/icons';
import styled from 'styled-components';
import StyledFormItem from '../styled-components/StyledFormItem';
import timeList from '@/constants/time';
import thresholdList from '@/constants/threshold';
import StyledDiv from '../styled-components/StyledDiv';
import StyledButton from '../styled-components/StyledButton';
import GalleryPopup from '../popups/GalleryPopup';
import { StepProps } from '@/constants/steps';
import { useGetAdminQuizQuery, useUpdateQuizMutation } from '@/api/apiv2';

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

const DownloadCover = styled.div<{ background: string }>`
  margin-top: 12px;
  max-width: 330px;
  width: 100%;
  min-height: 192px;
  padding: 20px;
  box-sizing: border-box;
  border-radius: 8px;
  background: ${({ background }) => (background === '' ? '#EDEEF0;' : `url(${background});
  background-position: center;
  background-size: cover;`)}
`;

const NewQuizStep4: FC<StepProps> = ({
  quizId,
  isSubmit,
  setIsSubmit,
}) => {
  const { data: quiz, error } = useGetAdminQuizQuery(quizId, {
    refetchOnMountOrArgChange: true,
  });
  const [time, setTime] = useState(error ? 0 : quiz?.duration ?? 0);
  const [isTimeValid, setIsTimeValid] = useState(true);
  const [threshold, setThreshold] = useState(error ? 70 : quiz?.threshold ?? 70);
  const [image, setImage] = useState(error ? '' : quiz?.image ?? '');
  const [isImageValid, setIsImageValid] = useState(true);
  const [isGalleryPopupOpen, setIsGalleryPopupOpen] = useState(false);

  const [updateQuiz] = useUpdateQuizMutation();

  useEffect(() => {
    setTime(error ? 0 : quiz?.duration ?? 0);
    setIsTimeValid(true);
    setThreshold(error ? 70 : quiz?.threshold ?? 70);
    setImage(error ? '' : quiz?.image ?? '');
    setIsImageValid(true);
    setIsGalleryPopupOpen(false);
  }, [quiz]);
  const onSubmit = async () => {
    await updateQuiz({
      quizId,
      quiz: {
        description: quiz?.description,
        directory: quiz?.directory,
        duration: time,
        threshold,
        name: quiz?.name,
        level: quiz?.level,
        tags: quiz?.tags,
      },
    });
    setIsSubmit([false, false, false, false]);
  };

  useEffect(() => {
    if (isSubmit[3]) {
      onSubmit();
    }
  }, [isSubmit]);

  return (
    <StyledDiv>
      <FormLayout>
        <FormLayoutGroup mode='horizontal' style={{ padding: 0 }}>
          <FormItemForNewQuiz
            htmlFor='time'
            top='Время прохождения'
            onBlur={() => setIsTimeValid(time !== 0)}
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
              onChange={(e) => setTime(Number(e.target.value))}
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
          onBlur={() => setIsImageValid(image !== '')}
          onChange={() => setIsTimeValid(true)}
          status={isImageValid ? 'default' : 'error'}
          style={{ maxWidth: '499px' }}>
          <DownloadCover
            background={image}>
            {image === '' && <Icon56GalleryOutline width={114} height={114} fill='#fff' style={{ margin: '0 auto' }} />}
            <StyledButton
              style={{
                display: 'block',
                maxWidth: 'min-content',
                margin: `${image === '' ? '6' : '120'}px auto 0`,
              }}
              onClick={() => setIsGalleryPopupOpen(true)}>
              {image === '' ? 'Выбрать обложку' : 'Заменить обложку'}
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
