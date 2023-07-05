/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components';

const LeftDiv = styled.div`
    -webkit-clip-path: polygon(25% 0%, 100% 0, 100% 100%, 25% 100%, 0 50%);
    clip-path: polygon(25% 0%, 100% 0, 100% 100%, 25% 100%, 0 50%);
    width: 80px;
    height: 90px;
    position: relative;
    background-color:#FFA000;
    transform: rotate(90deg) translateX(5px);
    &::after {
        content: "";
        clip-path: polygon(25% 0%, 100% 0px, 100% 100%, 25% 100%, 0px 50%);
        width: 98%;
        height: 98%;
        position: absolute;
        inset: 1px;
        background-color: white;
        transform: rotate(0);
    }
`;

const Triangle = styled.div<{ value: number }>`
     -webkit-clip-path: polygon(25% 0%, 100% 0, 100% 100%, 25% 100%, 0 50%);
    clip-path: polygon(25% 0%, 100% 0, 100% 100%, 25% 100%, 0 50%);
    width: 80px;
    height: 90px;
    position: absolute;
    background-color:#FFA000;
    z-index: 999999;
    bottom: 0;
    left: ${({ value }) => value}px;
`;

const CentralDiv = styled.div`
    clip-path: polygon(0px 100%, 39% 100%, 37% 26%, 0 15%);
    transform: translateX(-14px);
    width: 52px;
    height: 80px;
    position: relative;
    background-color: #4E7C3C;
    &::after {
        content: '';
        clip-path: polygon(0% 100%, 36% 100%, 34% 26%, 1% 16%);
        width: 98%;
        height: 98%;
        position: absolute;
        inset:1px;
        background-color: white;
    }
`;
const TriangleCentral = styled.div<{ value: number }>`
    clip-path: polygon(0px 100%, 39% 100%, 37% 26%, 0 15%);
    
    width: 52px;
    height: 80px;
    position: absolute;
    background-color:#FFA000;
    bottom: ${({ value }) => value}px;
    z-index: 99999999999999999;
    left: 0px;
`;

const TriangleCenterSecond = styled.div<{ value: number }>`
    clip-path: polygon(0px 100%, 39% 100%, 37% 26%, 0 15%);
    
    width: 52px;
    height: 80px;
    position: absolute;
    background-color:#4E7C3C;
    bottom: ${({ value }) => value}px;
    z-index: 99999999999999999;
    left: 0px;
`;

const RightDiv = styled.div`
    width: 65px;
    height: 127px;
    border: 1px solid #6DAE6D;
    transform: translateX(-66px);
    position: relative;
    overflow: hidden;
`;

const OverDiv = styled.div<{ value: number }>`
     width: 65px;
    height: 127px;
    position: absolute;
    background-color: #6DAE6D ;
    bottom: ${({ value }) => value}px;
    opacity: .8;
`;

const LoaderContainer = styled.div`
    width: 261px;
    height: 127px;
    border-bottom: 1px solid #000000;
    display: flex;
    align-items: end;
    justify-content: end;
`;

const LoaderLayout = styled.div`
    width: 100vw;
    height: 100vh;
    opacity: 0.7;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    background-color: white;
    top: 0;
    left: 0;
    z-index: 99999;
`;

const LoaderV2: FC = () => {
  const [firstValue, setFirstValue] = useState<number>(48);
  const [secondValue, setSecondValue] = useState<number>(109);

  const intervalFunc = () => {
    const a = setInterval(() => {
      if (firstValue === 0) {
        console.log(222222);
        clearInterval(a);
      }
      setFirstValue((prev) => prev - 1);
    }, 1000);
  };

  useEffect(() => {
    intervalFunc();
  }, [firstValue]);
  return (
    <LoaderLayout>
      <LoaderContainer>
        <LeftDiv>
          <Triangle value={firstValue} />

        </LeftDiv>
        <CentralDiv>
          <TriangleCentral value={-firstValue} />
          {/* <TriangleCenterSecond value={-48} /> */}
        </CentralDiv>
        <RightDiv>
          <OverDiv value={-secondValue} />
        </RightDiv>
      </LoaderContainer>
    </LoaderLayout>

  );
};

export default LoaderV2;
