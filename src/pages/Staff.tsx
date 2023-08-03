/* eslint-disable no-plusplus */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import StaffFilter from '../ui-lib/widgets/StaffFilters';
import StaffList from '../ui-lib/widgets/StaffList';
import ChooseQuizzesPopup from '../ui-lib/widgets/ChooseQuizzesPopup';
import staff from '../constants/staff';
import ConfirmationPopup from '../ui-lib/widgets/ConfirmationPopup';
import NewEmployeePopup from '../ui-lib/widgets/NewEmployeePopup';

const StyledDiv = styled.div`
  width: 100%;
`;

const Staff: FC = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const [selectType, setSelectType] = useState<any>('all');
  const [isChooseQuizzesPopupOpen, setIsChooseQuizzesPopupOpen] = useState(false);
  const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = useState(false);
  const [isNewEmployeePopupOpen, setIsNewEmploeePopupOpen] = useState(false);

  const departments = [{ label: 'Все отделы', value: 'all' }];
  for (let i = 0; i < staff.length; i++) {
    if (!departments.some((dep) => dep.label === staff[i].department)) {
      departments.push({ label: staff[i].department, value: staff[i].department });
    }
  }
  return (
    <>
      <StyledDiv>
        <StaffFilter
          departments={departments}
          setSearch={setSearch}
          search={search}
          type={selectType}
          setType={setSelectType}
          setIsChooseQuizzesPopupOpen={setIsChooseQuizzesPopupOpen}
          setIsNewEmploeePopupOpen={setIsNewEmploeePopupOpen} />
        <StaffList
          departments={departments} />
      </StyledDiv>
      <ChooseQuizzesPopup
        setIsChooseQuizzesPopupOpen={setIsChooseQuizzesPopupOpen}
        setIsConfirmationPopupOpen={setIsConfirmationPopupOpen}
        isChooseQuizzesPopupOpen={isChooseQuizzesPopupOpen} />
      <ConfirmationPopup
        isConfirmationPopupOpen={isConfirmationPopupOpen}
        setIsConfirmationPopupOpen={setIsConfirmationPopupOpen} />
      <NewEmployeePopup
        isNewEmployeePopupOpen={isNewEmployeePopupOpen}
        setIsNewEmploeePopupOpen={setIsNewEmploeePopupOpen}
        type={selectType}
        setType={setSelectType}
        departments={departments} />
    </>
  );
};

export default Staff;
