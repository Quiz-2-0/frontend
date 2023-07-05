/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useEffect } from 'react';
import styled from 'styled-components';
import '../LoaderAnimation.css';
import { useDispatch } from 'react-redux';
import { setLoaderState } from '../../store/allSlice/allSlice';

const StyledBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 7.74px;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, .8);
  z-index: 99999;
`;

const StyledDiv = styled.div`
  width: 261px;
  height: 130px;
  border-bottom: 2px solid black;
  display: flex;
  justify-content: center;
  position: relative;
`;

const HouseWithTriangleRoof = styled.div`
  height: min-content;
  width: 89.3px;
  align-self: flex-end;
  transform: translateX(11.8px);
`;

const HouseWithStraightRoof = styled.div`
  height: 126px;
  width: 65.7px;
  border: 2px solid #6DAE6D;
  transform: translateX(-11.8px) translateY(1px);
  border-radius: 2px;
  position: relative;

  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 0%;
    opacity: 0;
    background-color: #6DAE6D;
    animation: fill-green-background 3s linear infinite
  }
`;

const Triangle = styled.div`
  height: 61px;
  width: 61px;
  border: 2px solid #FFA000;
  border-width: 2px 0 0 2px;
  border-radius: 2px;
  transform: rotate(45deg) translate(32px, 13.5px);
  position: relative;

  &:after {
    position: absolute;
    bottom: -12.5px;
    left: 8.5px;
    opacity: 0;
    content: '';
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0 44.65px 43.13px 44.65px;
    border-radius: 2px;
    border-color: transparent transparent #FFA000 transparent;
    transform: rotate(-45deg);
    animation: raise-triangle 3s linear infinite;
  }
`;

const Rectangle = styled.div`
  height: 55px;
  width: 89.3px;
  box-sizing: border-box;
  border-bottom: 2px solid #FFA000;
  border-left: 2px solid #FFA000;
  border-right: 2px solid #FFA000;
  border-radius: 2px;
  position: relative;

  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 0%;
    opacity: 0;
    background-color: #FFA000;
    animation: fill-orange-background 3s linear infinite
  }
`;

const Intersection = styled.div`
  position: absolute;
  right: 108.5px;
  bottom: 0px;
  width: 23.6px;
  height: min-content;
`;

const IntersectionTriangle = styled(Triangle)`
  height: 0;
  width: 0;
  border: none;
  transform: rotate(0) translate(0);

  &:after {
    bottom: -55px;
    left: 1px;
    opacity: 0;
    border-width: 23.6px 0 0 23.6px;
    border-color: transparent transparent transparent #4E7C3C;
    transform: rotate(0deg);
    animation: raise-intersection-triangle 3s linear infinite;
  }
`;

const IntersectionLine = styled(Triangle)`
  height: 33.4px;
  width: 33.4px;
  width: 0;
  border-style: solid;
  border-width: 2px 0 0 2px;
  border-color: transparent transparent transparent #4E7C3C;

&:after {
  display: none;
}
`;

const IntersectionRectangle = styled(Rectangle)`
  width: 23.6px;
  border-bottom: 2px solid #4E7C3C;
  border-left: 2px solid #4E7C3C;
  border-right: 2px solid #4E7C3C;

  &:after {
    left: 0;
    bottom: 0;
    background: #4E7C3C;
    animation: fill-intersection-green-background 3s linear infinite;
  }
`;

const StyledText = styled.p`
  font-size: 24px;
  font-family: AlethiaPro;
  font-style: normal;
  font-weight: 400;
  height: 24px;
  margin: 0 0 0 5px;
  display: inline-block;
  width: 261px;
  position: relative;

  &:after {
    position: absolute;
    top: 0;
    left: 0;
    content: '';
    animation: change-content 3s linear infinite;
  }
`;

const Loader: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      dispatch(setLoaderState(false));
    }, 3000);
  }, []);

  return (
    <StyledBackground>
      <StyledDiv>
        <HouseWithTriangleRoof>
          <Triangle />
          <Rectangle />
        </HouseWithTriangleRoof>
        <HouseWithStraightRoof />
        <Intersection>
          <IntersectionTriangle>
            <IntersectionLine style={{ transform: 'rotate(-45deg) translate(26px, -10px)', height: '30px' }} />
            <IntersectionLine style={{ transform: 'rotate(0deg) translate(0, -53px)', height: '21px' }} />
          </IntersectionTriangle>
          <IntersectionRectangle />
        </Intersection>
      </StyledDiv>
      <StyledText />
    </StyledBackground>

  );
};

export default Loader;
