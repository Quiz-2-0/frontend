/* eslint-disable @typescript-eslint/no-unsafe-return */
import React, { FC, useState } from 'react';
import { FormLayoutGroup, IconButton, Textarea, Title } from '@vkontakte/vkui';
import { Icon28DeleteOutline } from '@vkontakte/icons';
import StyledInput from '@/ui-lib/styled-components/StyledInput';
import StyledDiv from '@/ui-lib/styled-components/StyledDiv';
import FormItemForNewQuiz from '@/ui-lib/styled-components/FormItemForNewQuiz';
import { IVolumeItem } from '@/types/types';

export interface IVolumeItemProps extends IVolumeItem {
  index: number;
  canRemove: boolean;
  editVolume: (id: number, data: Partial<IVolumeItem>) => void;
  removeVolume: (id: number) => any;
}

const NewQuizStep3VolumeItem: FC<IVolumeItemProps> = (
  {
    volume: {
      id = 0,
      name = '',
      description = '',
    },
    index,
    canRemove,
    editVolume,
    removeVolume,
  },
) => {
  const [isValidName, setIsValidName] = useState(true);
  const [isValidDesc, setIsValidDesc] = useState(true);

  const isValid = () => isValidName && isValidDesc;

  const handleChangeName: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value } = e.target;
    setIsValidName(Boolean(value));
    editVolume(
      id,
      {
        volume: {
          name: value,
        },
        isChanged: true,
        isValid: isValid(),
      },
    );
  };

  const handleChangeDesc: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    const { value } = e.target;
    setIsValidDesc(Boolean(value));
    editVolume(
      id,
      {
        volume: {
          description: value,
        },
        isChanged: true,
        isValid: isValid(),
      },
    );
  };

  const handleBlurName: React.FocusEventHandler<HTMLInputElement> = (e) => {
    const { value } = e.target;
    setIsValidName(Boolean(value));
    editVolume(id, {
      isValid: isValid(),
    });
  };

  const handleBlurDesc: React.FocusEventHandler<HTMLTextAreaElement> = (e) => {
    const { value } = e.target;
    setIsValidDesc(Boolean(value));
    editVolume(id, {
      isValid: isValid(),
    });
  };

  return (
    <StyledDiv style={{ height: 'min-content', marginTop: '24px' }}>
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
          {`Тема №${index + 1}`}
        </Title>
        {canRemove && (
          <IconButton
            onClick={() => removeVolume(id)}
            style={{ width: '28px', height: '28px' }}
            aria-label='Удалить тему'>
            <Icon28DeleteOutline fill='#99A2AD' />
          </IconButton>
        )}
      </div>
      <FormLayoutGroup style={{ padding: 0 }}>

        <FormItemForNewQuiz
          htmlFor='name'
          top='Тема'
          status={isValidName ? 'default' : 'error'}
          style={{
            maxWidth: '546px',
            marginBottom: '28px',
          }}>
          <StyledInput
            style={{ minHeight: '40px' }}
            id='name'
            name='name'
            type='text'
            placeholder='Введите название темы'
            value={name}
            onChange={handleChangeName}
            onBlur={handleBlurName} />
        </FormItemForNewQuiz>

        <FormItemForNewQuiz
          htmlFor='description'
          top='Описание'
          status={isValidDesc ? 'default' : 'error'}
          style={{
            boxSizing: 'border-box',
          }}>
          <Textarea
            style={{ minHeight: '120px', alignItems: 'flex-start' }}
            placeholder='Введите текст'
            value={description}
            onChange={handleChangeDesc}
            onBlur={handleBlurDesc} />
        </FormItemForNewQuiz>

      </FormLayoutGroup>
    </StyledDiv>
  );
};

export default NewQuizStep3VolumeItem;
