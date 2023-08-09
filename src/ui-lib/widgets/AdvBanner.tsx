/* eslint-disable ternary/no-unreachable */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { CupIcon, SquareIcon, RedBallIcon } from '../styled-components/icons';
import achieve1 from '@/assets/images/achievement-icons/icon1.png';
import achieve2 from '@/assets/images/achievement-icons/icon2.png';
import achieve3 from '@/assets/images/achievement-icons/icon3.png';

const BannerPlate = styled.div<{ isOpen: boolean }>`
    display: flex;
    flex-direction: column;
    width: 304px;
    border-radius: 4px;
    background: #FFF ;
    box-shadow: 0 16px 16px 0 rgba(0, 0, 0, 0.16), 0 0 8px 0 rgba(0, 0, 0, 0.12);
    opacity: ${({ isOpen }) => (isOpen ? '1' : '0')};
    visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
    transition: opacity ease .3s, visibility ease .3s;
    position: absolute;
    top: 71px;
    right: 0;
    z-index: 50;
`;

const BannerHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: end;
    padding: 8px 16px;
`;

const Button = styled.button`
    border: none;
    background-color: transparent;
    font-size: 12px;
    font-family: 'SFProDisplay';
    font-style: normal;
    font-weight: 400;
    line-height: 14px;
    color: #577CA1;
    cursor: pointer;
    padding: 0;
`;

const AchieveWrapper = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
`;
const Achive = styled.img`
    width: 100%;
    height: 100%;
`;

const Sentence = styled.p`
    max-width: 200px;
    width: 100%;
    font-size: 14px;
    font-family: 'SFProDisplay';
    font-style: normal;
    font-weight: 400;
    line-height: 18px;
    letter-spacing: -0.154px;
    color: #6D7885;
    margin: 0;
`;

const AdvContainer = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
`;

const AdvPlate = styled.li`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    border-bottom: 1px solid #E7E8EC;
    padding: 8px 16px 8px 24px ;
    box-sizing: border-box;
    min-height: 36px;
    position: relative;
    &:last-of-type {
        border-bottom: none;
    }
`;

const StyledDiv = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

const AdvBanner: FC<{ isOpen: boolean }> = ({ isOpen }) => (
  <BannerPlate className='banner' isOpen={isOpen}>
    <BannerHeader>
      <Button>прочесть все</Button>
    </BannerHeader>
    <AdvContainer>
      <AdvPlate>
        <RedBallIcon left={14} />
        <StyledDiv>
          <CupIcon />
          <Sentence>У вас новая ачивка “Вызов июля"</Sentence>
        </StyledDiv>
        <AchieveWrapper>
          <Achive src={achieve1} />
        </AchieveWrapper>
      </AdvPlate>
      <AdvPlate>
        <RedBallIcon left={14} />
        <StyledDiv>
          <SquareIcon />
          <Sentence>Вам назначен новый квиз</Sentence>
        </StyledDiv>
        {/*    {<AchieveWrapper>
                      <Achive src={achieve3} />
                  </AchieveWrapper>} */}
      </AdvPlate>
      <AdvPlate>
        <RedBallIcon left={14} />
        <StyledDiv>
          <CupIcon />
          <Sentence>У вас новая ачивка “5 квизов без ошибок”</Sentence>
        </StyledDiv>
        <AchieveWrapper>
          <Achive src={achieve2} />
        </AchieveWrapper>
      </AdvPlate>
    </AdvContainer>
  </BannerPlate>
);

export default AdvBanner;
