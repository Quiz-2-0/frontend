/* eslint-disable no-plusplus */
/* eslint-disable ternary/nesting */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import React, { FC, useState, useEffect } from 'react';
import styled from 'styled-components';
import { FormItem, IconButton } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import { Icon20ChevronRight, Icon24CancelOutline } from '@vkontakte/icons';
import StyledBackAndForwardButton from '../styled-components/StyledBackAndForwardButton';
import Background from '../styled-components/Background';
import StyledButton from '../styled-components/StyledButton';
import StyledCheckbox from '../styled-components/StyledCheckbox';
import { useGetImagesForQuizzesQuery } from '@/api/api';

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
    display: none;
}
`;

const PageButton = styled(StyledBackAndForwardButton)<{ currentPage: number, page: number }>`
  border-radius: 0;
  width: 40px;
  height: 40px;
  background: ${({ currentPage, page }) => (currentPage === page ? 'rgba(63, 138, 224, 0.15)' : 'none')};

  & > .vkuiButton__in > .vkuiButton__content {
    justify-content: center;
    gap: 0;
  }
`;

const GalleryPopup: FC<{
  isGalleryPopupOpen: boolean,
  setIsGalleryPopupOpen: any,
  image: string,
  setImage: any,
}> = ({
  isGalleryPopupOpen,
  setIsGalleryPopupOpen,
  image,
  setImage,
}) => {
  const MAX_IMAGES_QUANTITY_ON_PAGE = 9;
  const { data: images } = useGetImagesForQuizzesQuery();
  const [currentPage, setCurrentPage] = useState(
    (images?.length ?? 0) > MAX_IMAGES_QUANTITY_ON_PAGE ? 1 : NaN,
  );
  const [imagesOnPage, setImagesOnPage] = useState(
    images?.slice(0, MAX_IMAGES_QUANTITY_ON_PAGE) ?? [],
  );

  const pages: number[] = [];
  for (let i = 0; i < Math.ceil((images?.length ?? 0) / 9); i++) {
    pages.push(i + 1);
  }

  const choosePage = (value: number) => {
    setCurrentPage(value);
    if (value === 1) {
      setImagesOnPage(images?.slice(0, MAX_IMAGES_QUANTITY_ON_PAGE) ?? []);
    } else if (value === pages.length) {
      setImagesOnPage(images?.slice(value * MAX_IMAGES_QUANTITY_ON_PAGE) ?? []);
    }
    setImagesOnPage(
      images?.slice(
        MAX_IMAGES_QUANTITY_ON_PAGE * (value - 1),
        MAX_IMAGES_QUANTITY_ON_PAGE * value,
      ) ?? [],
    );
  };

  useEffect(() => {
    setCurrentPage(
      (images?.length ?? 0) > MAX_IMAGES_QUANTITY_ON_PAGE ? 1 : NaN,
    );
    setImagesOnPage(images?.slice(0, 9) ?? []);
    for (let i = 0; i < Math.ceil((images?.length ?? 0) / 9); i++) {
      pages.push(i + 1);
    }
  }, [images]);

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
              setImage('');
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
            width: '100%',
            minHeight: '436px',
            boxSizing: 'border-box',
            margin: 0,
            padding: 0,
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px',
          }}>
          {imagesOnPage.map((item) => (
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
              onClick={() => setImage(item.image)}>
              <GalleryCheckbox
                checked={image === item.image} />
            </div>
          ))}
        </FormItem>
        <div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '28px',
          }}>
          <StyledButton
            disabled={image === ''}
            style={{
              minWidth: '167px',
              marginTop: '0',
            }}
            onClick={() => {
              setIsGalleryPopupOpen(false);
            }}>
            Применить
          </StyledButton>
          <div
            style={{
              width: '100%',
              display: `${!Number.isNaN(currentPage) ? 'flex' : 'none'}`,
              justifyContent: 'flex-end',
              alignItems: 'center',
              gap: '8px',
            }}>
            <StyledBackAndForwardButton
              onClick={() => choosePage(1)}
              style={{ display: `${currentPage === 1 ? 'none' : 'block'}` }}
              aria-label='В начало'
              mode='link'>
              <Icon20ChevronRight style={{ transform: 'rotate(180deg)' }} />
              В начало
            </StyledBackAndForwardButton>
            <div
              style={{
                display: 'flex',
              }}>
              {pages.map((page) => (
                <PageButton
                  currentPage={currentPage}
                  page={page}
                  key={page}
                  mode='link'
                  aria-label={`Страница ${page}`}
                  onClick={() => choosePage(page)}>
                  {page}
                </PageButton>
              ))}
            </div>
            <StyledBackAndForwardButton
              onClick={() => choosePage(pages.length)}
              style={{ display: `${currentPage === pages.length ? 'none' : 'block'}` }}
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
