/* eslint-disable @typescript-eslint/no-unsafe-call */
import React, { FC, useEffect } from 'react';
import { FormLayoutGroup, IconButton, Text, Textarea, Title } from '@vkontakte/vkui';
import { Icon28DeleteOutline } from '@vkontakte/icons';
import StyledInput from '@/ui-lib/styled-components/StyledInput';
import StyledDiv from '@/ui-lib/styled-components/StyledDiv';
import FormItemForNewQuiz from '@/ui-lib/styled-components/FormItemForNewQuiz';
import { FormElements, SetFormElements, StepProps } from '@/constants/steps';
/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { FC, useEffect, useState } from 'react';
import { Button } from '@vkontakte/vkui';
import { FormElements, SetFormElements } from '@/constants/steps';
import {
  useGetVolumesQuery,
  useUpdateVolumeMutation,
  useDeleteVolumeMutation, useCreateVolumeMutation,
} from '@/api/apiv2';
import NewQuizStep3VolumeItem from '@/ui-lib/widgets/NewQuizStep3VolumeItem';
import { Volume } from '@/types/types';

export interface IVolumeItem {
  volume: Partial<Volume>;
  isNew: boolean;
  isChanged: boolean;
  isValid: boolean;
}

const NewQuizStep3: FC<StepProps> = ({
  items,
  setItems,
  formElements,
  setFormElements,
  isSubmit,
  setNextPage,
  setIsSubmit,
}) => {
  useEffect(() => {
    if (isSubmit[2]) {
      setNextPage();
      setIsSubmit([false, false, false, false]);
    }
  }, [isSubmit]);

  return (
    <>
      {items.map((question, i) => (
        <StyledDiv key={question} style={{ height: 'min-content', marginTop: '24px' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              marginBottom: '36px',
            }}>
            <Title
              level='3'
              style={{
                color: '#818C99',
                fontSize: '16px',
                fontWeight: '500',
                lineHeight: '20px',
                letterSpacing: '-0.32px',
              }}>
              {`Тема №${1}`}
            </Title>
            <IconButton
              style={{ width: '28px', height: '28px' }}
              aria-label='Удалить тему'>
              <Icon28DeleteOutline fill='#99A2AD' />
            </IconButton>
          </div>
          <FormLayoutGroup style={{ padding: 0 }}>
}) => {
  const [newVolumeIdx, setNewVolumeIdx] = useState(-1);

  // const { id: quizId } = useParams();
  const quizId = 6;
  const { data: volumes } = useGetVolumesQuery(Number(quizId));
  const [volumeItems, setVolumeItems] = useState<IVolumeItem[]>([]);
  const [removeVolumeRun] = useDeleteVolumeMutation();
  const [updateVolumeRun] = useUpdateVolumeMutation();
  const [createVolumeRun] = useCreateVolumeMutation();

  const createOrUpdateVolume = async (volumeItem: IVolumeItem) => {
    const { volume } = volumeItem;
    if (!volumeItem.isChanged) return;
    if (!volume.id || !volume.name || !volume.description) return;

    try {
      let newVolume: Volume;

      if (volumeItem.isNew) {
        newVolume = await createVolumeRun({
          quizId,
          volume: {
            name: volume.name,
            description: volume.description,
          },
        }).unwrap();
      } else {
        newVolume = await updateVolumeRun({
          quizId,
          volumeId: volume.id,
          volume: {
            name: volume.name,
            description: volume.description,
          },
        }).unwrap();
      }

      setVolumeItems(volumeItems.map(({ volume: volOld, ...otherProps }) => {
        if (volOld.id !== volume.id) {
          return { volume: volOld, ...otherProps };
        }
        return {
          volume: {
            ...newVolume,
          },
          ...otherProps,
          isChanged: false,
          isNew: false,
          isValid: true,
        };
      }));
    } catch (err) {
      console.error(err);
    }
  };

  const addVolume = async () => {
    setNewVolumeIdx(newVolumeIdx - 1);
    // eslint-disable-next-line no-restricted-syntax
    for (const volumeItem of volumeItems) {
      if (volumeItem.isChanged) {
        // eslint-disable-next-line no-await-in-loop
        await createOrUpdateVolume(volumeItem);
      }
    }
    setVolumeItems([...volumeItems, {
      volume: {
        id: newVolumeIdx,
      },
      isNew: true,
      isChanged: false,
      isValid: true,
    }]);
  };

  const editVolume = (volumeId: number, volume: Partial<IVolumeItem>) => {
    setVolumeItems(volumeItems.map(({ volume: volumeOld, ...otherProps }) => {
      if (volumeOld.id !== volumeId) {
        return { volume: volumeOld, ...otherProps };
      }
      return {
        volume: {
          ...volumeOld,
          ...volume.volume,
        },
        ...otherProps,
        isChanged: true,
      };
    }));
  };

  const removeVolumeFromList = (volumeId: number) => {
    setVolumeItems(volumeItems.filter((item) => item.volume.id !== volumeId));
  };

  const removeVolume = async (volumeId: number) => {
    if (volumeId < 0) {
      removeVolumeFromList(volumeId);
      return;
    }

            <FormItemForNewQuiz
              htmlFor='theme-name'
              top='Тема'
              style={{
                maxWidth: '546px',
                marginBottom: '28px',
              }}>
              <Text
                style={{
                  color: 'var(--steel-gray-500, #6F7985)',
                  fontFamily: 'SFProDisplay',
                  fontSize: '14px',
                  fontStyle: 'normal',
                  fontWeight: '400',
                  lineHeight: '18px',
                  letterSpacing: '-0.154px',
                  marginBottom: '20px',
                }}>
                Введите варианты ответов и отметьте правильный
                введите варианты ответов и отметьте правильный...
                введите варианты ответов и отметьте правильный...
              </Text>
              <StyledInput
                style={{ minHeight: '40px' }}
                id='theme-name'
                type='text'
                placeholder='Введите название темы'
                name='theme-name' />
            </FormItemForNewQuiz>
    try {
      await removeVolumeRun({ quizId, volumeId });
      removeVolumeFromList(volumeId);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (typeof volumes !== 'undefined') {
      setVolumeItems(volumes.map((item) => ({
        volume: item,
        canRemove: volumes.length > 1,
        isNew: false,
        isChanged: false,
        isValid: true,
      })));
    }
  }, [volumes]);
            <FormItemForNewQuiz
              htmlFor='description'
              top='Описание'
              style={{
                boxSizing: 'border-box',
              }}>
              <Textarea
                style={{ minHeight: '120px', alignItems: 'flex-start' }}
                placeholder='Введите текст' />
            </FormItemForNewQuiz>

          </FormLayoutGroup>
        </StyledDiv>
      ))}
    </>
  );
};
  return (
    <>
      {volumeItems.map((volumeItem, index) => (
        <NewQuizStep3VolumeItem
          key={volumeItem.volume.id ?? `new_${index}`}
          volume={volumeItem.volume}
          index={index}
          isNew={volumeItem.isNew}
          isChanged={volumeItem.isChanged}
          isValid={volumeItem.isValid}
          canRemove={volumeItems.length > 1 || volumeItem.isNew}
          editVolume={editVolume}
          removeVolume={removeVolume} />
      ))}
      <Button
        size='l'
        onClick={addVolume}>
        + Добавить
      </Button>
    </>
  );
};

export default NewQuizStep3;
