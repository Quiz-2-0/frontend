/* eslint-disable ternary/no-unreachable */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { CupIcon, SquareIcon, RedBallIcon } from '../icons';
import achieve1 from '../../images/achievement-icons/icon1.png';
import achieve2 from '../../images/achievement-icons/icon2.png';
import achieve3 from '../../images/achievement-icons/icon3.png';

const BannerPlate = styled.div<{ isOpen:boolean }>`
    display: flex;
    flex-direction: column;
    width: 304px;
    border-radius: 4px;
    background: #FFF ;
    box-shadow: 0px 16px 16px 0px rgba(0, 0, 0, 0.16), 0px 0px 8px 0px rgba(0, 0, 0, 0.12);
    opacity: ${({ isOpen }) => (isOpen ? '1' : '0')};
    visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
    transition: opacity ease .3s, visibility ease .3s;
    position: absolute;
    
    top: 80px;
    right: 0px;
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
`;

const AchieveWrapper = styled.div`
  width:20px;
  height:20px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
  margin-left: 8px;
`;
const Achive = styled.img`
    width: 20px;
    height: 20px;
   
`;

const Sentence = styled.p`
    font-size: 14px;
    font-family: 'SFProDisplay';
    font-style: normal;
    font-weight: 400;
    line-height: 18px;
    letter-spacing: -0.154px;
    color: #6D7885;
    margin: 0;
    margin-left: 12px;
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
    align-items: center;
    width: 100%;
    border-bottom: 1px solid #E7E8EC;
    padding-inline: 16px;
    box-sizing: border-box;
    height: 36px;
    position: relative;
    &:last-of-type {
        border-bottom: none;
    }
`;

const AdvBanner: FC<{ isOpen:boolean }> = ({ isOpen }) => (
  <BannerPlate isOpen={isOpen}>
    <BannerHeader>
      <Button>прочесть все</Button>
    </BannerHeader>
    <AdvContainer>
      <AdvPlate>
        <RedBallIcon top={15} left={8} />
        <CupIcon />
        <Sentence>У вас новая ачивка “Вызов июля"</Sentence>
        <AchieveWrapper>
          <Achive src={achieve1} />
        </AchieveWrapper>
      </AdvPlate>
      <AdvPlate>
        <RedBallIcon top={15} left={8} />
        <SquareIcon />
        <Sentence>Вам назначен новый квиз</Sentence>
        {/*    {<AchieveWrapper>
                      <Achive src={achieve3} />
                  </AchieveWrapper>} */}
      </AdvPlate>
      <AdvPlate>
        <RedBallIcon top={15} left={8} />
        <CupIcon />
        <Sentence>У вас новая ачивка “5 квизов без ошибок”</Sentence>
        <AchieveWrapper>
          <Achive src={achieve2} />
        </AchieveWrapper>
      </AdvPlate>
    </AdvContainer>
  </BannerPlate>
);

export default AdvBanner;
