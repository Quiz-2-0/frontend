/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { FC } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router';
import StyledDiv from '../StyledDiv';
import { ArrowIcon } from '../icons';
import achive1 from '../images/achievement icon.png';
import achieve2 from '../images/achievement icon1.png';
import achieve3 from '../images/achievement icon23.png';

const UpdatedDiv = styled(StyledDiv)`
    width: 100%;
    max-width: 676px;
    display: flex;
    gap: 24px;
    flex-direction: column;
    
`;

const IconWrapper = styled.div`
    width: 28px;
    height: 28px;
    background-color:rgba(63, 138, 224, 0.05);
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
`;
const ContainerHeader = styled.div`
    width:100%;
    justify-content: space-between;
    display: flex;
`;
const Title = styled.h3`
    font-size: 20px;
    font-family: 'SFProDisplay';
    font-weight: 600;
    line-height: 24px;
    letter-spacing: 0.38px;
    color: #000;
    margin: 0;
`;
const AchiveImage = styled.img`
    width: 64px;
    height: 64px;
`;
/// / временное решение для индикации количества пройденных квизов
const Progress = styled.p`
    font-size: 13px;
    font-family: 'SFProDisplay';
    font-weight: 500;
    line-height: 16px;
    letter-spacing: -0.078px;
    color: #828282;
    margin: 0;
`;

const AchivePlate = styled.li`
    display: flex;
    gap: 16px;
    padding-top: 12px;
    padding-bottom: 12px;
    width: 100%;

`;

const ProgressWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 25px ;
    flex: auto;
`;
/// / создать метод для высчитывания длины прогрессбара
const ProgressBar = styled.span<{ width?: number }>`
    width: 100%;
    height: 8px;
    background-color: rgba(63, 138, 224, 0.15);
    border-radius: 8px;
    position: relative;
    &::before {
        content: '';
        border-radius: 8px 0px 0px 8px;
        background-color:#3F8AE0;
        height: 8px;
        position: absolute;
        width: ${({ width }) => width}px;
    }
`;

const AchivesContainer = styled.ul`
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
`;

const Achives: FC = () => {
  const navigate = useNavigate();
  return (
    <UpdatedDiv>
      <ContainerHeader>
        <Title>Ачивки</Title>
        <IconWrapper><ArrowIcon /></IconWrapper>
      </ContainerHeader>
      <AchivesContainer>
        <AchivePlate>
          <AchiveImage src={achive1} alt='ачивка крутая' />
          <ProgressWrapper>
            <ContainerHeader>
              <Title>Вызов Июня</Title>
              <Progress>8/10</Progress>
            </ContainerHeader>
            <ProgressBar width={40} />
          </ProgressWrapper>
        </AchivePlate>

        <AchivePlate>
          <AchiveImage src={achive1} alt='ачивка крутая' />
          <ProgressWrapper>
            <ContainerHeader>
              <Title>Вызов Июня</Title>
              <Progress>8/10</Progress>
            </ContainerHeader>
            <ProgressBar width={60} />
          </ProgressWrapper>
        </AchivePlate>

        <AchivePlate>
          <AchiveImage src={achive1} alt='ачивка крутая' />
          <ProgressWrapper>
            <ContainerHeader>
              <Title>Вызов Июня</Title>
              <Progress>8/10</Progress>
            </ContainerHeader>
            <ProgressBar width={200} />
          </ProgressWrapper>
        </AchivePlate>
      </AchivesContainer>
    </UpdatedDiv>
  );
};

export default Achives;
