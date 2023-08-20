import React, { FC, useRef, useState } from 'react';
import styled from 'styled-components';
import {
  Title,
  Headline,
  Caption,
  Button,
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import { useGetDefaultAvatarsQuery, useUploadAvatarMutation } from '@/api/api';
import { CloseIcon, UploadIcon, AvatarIcon } from '../styled-components/icons';
import { IAvatar } from '@/types/types';
import { SRC_BASE_URL } from '@/api/api-url';

interface PopupProps {
  closeAvatarPopup: () => void;
  isOpen: boolean;
}

const Popup = styled.div<{ isOpen: boolean }>`
  opacity: ${({ isOpen }) => (isOpen ? '1' : '0')};
  visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
  transition: visibility .5s, opacity .5s ease-out;
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.12);
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  z-index: 100;
`;

const PopupContainer = styled.div`
  width: 619px;
  min-height: 548px;
  padding: 48px;
  background-color: #ffffff;
  border-radius: 16px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`;

const AvatarGallery = styled.ul`
  margin: 16px 0 0 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
`;

const AvatarGalleryItem = styled.li`
  list-style: none;
  cursor: pointer;

  &:hover {
    opacity: .5;
  }
`;

const AvatarGalleryImg = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
`;

const CloseButton = styled.button`
  width: 28px;
  height: 28px;
  background-color: transparent;
  border-style: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  align-self: flex-end;
`;

const UploadInputWrapper = styled.div`
  margin: 16px 0 0 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 42px
`;

const UploadAvatarPreview = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 1px solid #DCE1E6;
  background: #FFF;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const UploadedImgPreview = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
`;

const AvatarUploadPopup: FC<PopupProps> = ({ isOpen, closeAvatarPopup }) => {
  const [uploadAvatar] = useUploadAvatarMutation();
  const { data: avatars } = useGetDefaultAvatarsQuery();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedAvatarUrl, setUploadedAvatarUrl] = useState<string>('');

  const handleFileSelect = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const convertFileToBase64 = (file: File): Promise<string> => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      if (reader.result !== null && typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error('Failed to convert file to Base64.'));
      }
    };

    reader.onerror = (err) => {
      reject(err);
    };
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      convertFileToBase64(selectedFile)
        .then((base64String) => uploadAvatar(base64String).unwrap())
        .then((avatar: IAvatar) => {
          const avatarUrl = SRC_BASE_URL + avatar.avatar;
          setUploadedAvatarUrl(avatarUrl);
          return avatar;
        })
        .catch((err) => {
          console.error('Произошла ошибка:', err);
        });
    }
  };

  return (
    <Popup className='avatarPopup' isOpen={isOpen}>
      <PopupContainer>
        <CloseButton type='button' onMouseDown={closeAvatarPopup}><CloseIcon /></CloseButton>
        <Title weight='3' style={{ margin: '24px 0 0 0' }}>Фото профиля</Title>
        <Headline style={{ margin: '10px 0 0 0' }}>Выберите изображение из галереи, либо загрузите своё фото.</Headline>
        <Headline weight='2' style={{ margin: '24px 0 0 0' }}>Галерея</Headline>
        <AvatarGallery>
          {avatars?.map((avatar) => (
            <AvatarGalleryItem key={avatar.id}>
              <AvatarGalleryImg src={avatar.avatar} alt={avatar.description} />
            </AvatarGalleryItem>
          ))}
        </AvatarGallery>
        <Headline weight='2' style={{ margin: '24px 0 0 0' }}>Ваше фото</Headline>
        <UploadInputWrapper>
          {uploadedAvatarUrl !== ''
            ? <UploadedImgPreview src={uploadedAvatarUrl} />
            : (
              <UploadAvatarPreview>
                <AvatarIcon />
              </UploadAvatarPreview>
            )}
          <UploadIcon onClick={handleFileSelect} />
          <input
            ref={fileInputRef}
            type='file'
            style={{ display: 'none' }}
            onChange={handleFileChange} />
        </UploadInputWrapper>
        <Caption style={{ whiteSpace: 'pre-wrap', margin: '8px 0 0 0' }}>
          {'Допустимый формат изображения JPG, GIF или PNG.\nМаксимальный размер файл 2 MB.'}
        </Caption>
        <Button style={{ margin: '32px 0 0 0' }}>Применить</Button>
      </PopupContainer>
    </Popup>
  );
};

export default AvatarUploadPopup;
