/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable ternary/nesting */
/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable ternary/no-unreachable */
import React, { FC, useRef } from 'react';
import styled from 'styled-components';
import { FormItem, IconButton } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import { Icon20ChevronRight, Icon24CancelOutline } from '@vkontakte/icons';
import StyledBackAndForwardButton from '../styled-components/StyledBackAndForwardButton';
import Background from '../styled-components/Background';
import StyledButton from '../styled-components/StyledButton';
import gallery from '@/constants/gallery';
import StyledCheckbox from '../styled-components/StyledCheckbox';

const StyledDiv = styled.div`
  max-width: 832px;
  height: 712px;
  width: 100%;
  padding: 48px;
  box-sizing: border-box;
  background: white;
  border-radius: 16px;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.06),
    0 4px 8px 0 rgba(0, 0, 0, 0.04);
`;

const GalleryCheckbox = styled(StyledCheckbox)`
  width: 40px !important;
  height: 40px;

  & > .vkuiCheckbox__icon {
    margin-right: 10px;
}
`;

const GalleryPopup: FC<{
  isGalleryPopupOpen: boolean,
  setIsGalleryPopupOpen: any,
  image: number,
  setImage: any,
}> = ({
  isGalleryPopupOpen,
  setIsGalleryPopupOpen,
  image,
  setImage,
}) => {
  const topRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const scrollToTop = () => {
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToBottom = () => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Background
      style={{
        visibility: `${isGalleryPopupOpen ? 'visible' : 'hidden'}`,
        opacity: `${isGalleryPopupOpen ? '1' : '0'}`,
      }}>
      <StyledDiv>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
          }}>
          <IconButton
            aria-label='Закрыть'
            style={{ width: '28px', height: '28px' }}
            onClick={() => {
              setIsGalleryPopupOpen(false);
              setImage(-1);
            }}>
            <Icon24CancelOutline fill='#3F8AE0' />
          </IconButton>
        </div>
        <h2
          style={{
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            gap: '12px',
            margin: '0 0 16px',
            fontSize: '20px',
            fontWeight: 600,
            lineHeight: '24px',
            letterSpacing: '0.38px',
          }}>
          Галерея
        </h2>
        <p
          style={{
            margin: 0,
            fontSize: '15px',
            fontWeight: '400',
            lineHeight: '20px',
            paddingBottom: '24px',
          }}>
          Выберите обложку для квиза из представленных
        </p>
        <FormItem
          style={{
            overflow: 'scroll',
            width: '100%',
            height: '436px',
            margin: 0,
            padding: 0,
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px',
          }}>
          {gallery.map((item, i) => (
            <div
              key={item.id}
              style={{
                width: '240px',
                height: '140px',
                backgroundImage: `url(${item.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                borderRadius: '6px',
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'flex-start',
              }}
              onClick={() => setImage(item.id)}
              ref={
                i === 0
                  ? topRef
                  : i === gallery.length - 1
                    ? bottomRef
                    : null
              }>
              <GalleryCheckbox
                checked={image === item.id} />
            </div>
          ))}
        </FormItem>
        <div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <StyledButton
            disabled={image === -1}
            style={{ minWidth: '167px', marginTop: '28px' }}
            onClick={() => {
              setIsGalleryPopupOpen(false);
            }}>
            Применить
          </StyledButton>
          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
              gap: '16px',
              marginTop: '14px',
            }}>
            <StyledBackAndForwardButton
              onClick={scrollToTop}
              aria-label='В начало'
              mode='link'>
              <Icon20ChevronRight style={{ transform: 'rotate(180deg)' }} />
              В начало
            </StyledBackAndForwardButton>
            <StyledBackAndForwardButton
              onClick={scrollToBottom}
              aria-label='В конец'
              mode='link'>
              В конец
              <Icon20ChevronRight />
            </StyledBackAndForwardButton>
          </div>
        </div>
      </StyledDiv>
    </Background>
  );
};

export default GalleryPopup;
