/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import StaffFilter from '../ui-lib/widgets/StaffFilters';
import StaffList from '../ui-lib/widgets/StaffList';

const StyledDiv = styled.div`
  width: 100%;
`;

const Staff: FC = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const [selectType, setSelectType] = useState<any>('all');
  return (
    <StyledDiv>
      <StaffFilter
        setSearch={setSearch}
        search={search}
        type={selectType}
        setType={setSelectType} />
      <StaffList />
    </StyledDiv>
  );
};

export default Staff;
