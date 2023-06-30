import React, { FC, useEffect } from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import Castle from '../ui-lib/widgets/Castle';
import Achives from '../ui-lib/widgets/Achives';
import Progress from '../ui-lib/widgets/Progress';
import Rating from '../ui-lib/widgets/Rating';
import { useSelector } from '../store/store.types';

const StyledDiv = styled.div`
  display: flex;
  gap: 40px;
  flex-direction: column;
  max-height: 600px;
`;

const Div = styled.div`
   display: flex;
   gap: 40px;
   
`;

const PersonalAccount: FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <StyledDiv>
        <Div>
          <Rating />
          <Progress />
        </Div>

        <Achives />
      </StyledDiv>
      <Castle />
    </>
  );
};

export default PersonalAccount;
