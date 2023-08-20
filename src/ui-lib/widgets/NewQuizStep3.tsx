/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Button } from '@vkontakte/vkui';
import { StepProps } from '@/constants/steps';
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
  const urlParams = useParams();
  const quizId = Number(urlParams.id);

  const { data: volumes } = useGetVolumesQuery(quizId);
  const [removeVolumeRun] = useDeleteVolumeMutation();
  const [updateVolumeRun] = useUpdateVolumeMutation();
  const [createVolumeRun] = useCreateVolumeMutation();

  const [volumeItems, setVolumeItems] = useState<IVolumeItem[]>([]);
  const [newVolumeIdx, setNewVolumeIdx] = useState(-1);

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

  const saveDrafts = async () => {
    // eslint-disable-next-line no-restricted-syntax
    for (const volumeItem of volumeItems) {
      if (volumeItem.isChanged) {
        // eslint-disable-next-line no-await-in-loop
        await createOrUpdateVolume(volumeItem);
      }
    }
  };

  const addVolume = async () => {
    await saveDrafts();
    setNewVolumeIdx(newVolumeIdx - 1);
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

  useEffect(() => {
    if (isSubmit[2]) {
      // eslint-disable-next-line promise/catch-or-return
      saveDrafts()
        .catch((err) => console.error(err))
        .finally(() => {
          setNextPage();
          setIsSubmit([false, false, false, false]);
        });
    }
  }, [isSubmit]);

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
