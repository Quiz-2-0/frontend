/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { StepProps } from '@/constants/steps';
import {
  useGetVolumesQuery,
  useRemoveVolumeMutation,
} from '@/api/api';
import NewQuizStep3VolumeItem from '@/ui-lib/widgets/NewQuizStep3VolumeItem';
import { IVolumeItem } from '@/types/types';
import ErrorPopup from '../popups/ErrorPopup';

const NewQuizStep3: FC<StepProps> = ({
  volumeItems,
  setVolumeItems,
  saveDrafts,
  setIsButtonDisabled,
  quizId,
  isSubmit,
  setNextPage,
  setIsSubmit,
}) => {
  const { data: volumes } = useGetVolumesQuery(quizId);
  const [removeVolumeRun] = useRemoveVolumeMutation();

  const [isErrorPopupOpen, setIsErrorPopupOpen] = useState(false);

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
    try {
      await removeVolumeRun({ quizId, volumeId });
      removeVolumeFromList(volumeId);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (volumes?.length !== 0 && typeof volumes !== 'undefined') {
      setVolumeItems(volumes.map((item) => ({
        volume: item,
        canRemove: false,
        isNew: false,
        isChanged: false,
        isValid: true,
      })));
    }
  }, [volumes]);

  useEffect(() => {
    if (isSubmit[2]) {
      // eslint-disable-next-line promise/catch-or-return
      saveDrafts()
        .catch((err: any) => console.error(err))
        .finally(() => {
          setNextPage();
          setIsSubmit([false, false, false, false]);
        });
    }
  }, [isSubmit]);

  useEffect(() => {
    const isDisabled: boolean = volumeItems.length !== 0 && volumeItems.every(
      (volumeItem) => (volumeItem.volume.name ?? '').length > 1 && (volumeItem.volume.description ?? '').length > 50 && volumeItem.isValid === true,
    );
    setIsButtonDisabled(isDisabled);
  }, [volumeItems]);

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
      <ErrorPopup
        title='Что-то пошло не так'
        description='В процессе создания квиза что-то пошло не так... Попробуйте ещё раз.'
        button='Вернуться к форме'
        isErrorPopupOpen={isErrorPopupOpen}
        setIsErrorPopupOpen={setIsErrorPopupOpen} />
    </>
  );
};

export default NewQuizStep3;
