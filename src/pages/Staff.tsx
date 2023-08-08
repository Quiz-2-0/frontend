/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable no-plusplus */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import StaffFilter from '../ui-lib/widgets/StaffFilters';
import StaffList from '../ui-lib/widgets/StaffList';
import ChooseQuizzesPopup from '../ui-lib/popups/ChooseQuizzesPopup';
import staff from '../constants/staff';
import ConfirmationPopup from '../ui-lib/popups/ConfirmationPopup';
import NewEmployeePopup from '../ui-lib/popups/NewEmployeePopup';
import departments from '../constants/departments';
import quizzes from '../constants/quizzes';
import { useGetAllQuizesQuery } from '../api/apiv2';

const StyledDiv = styled.div`
  width: 100%;
`;

const Staff: FC = () => {
  const dispatch = useDispatch();
  const [searchEmployee, setSearchEmployee] = useState('');
  const [searchQuiz, setSearchQuiz] = useState('');
  const [isEmployeeChecked, setIsEmployeeChecked] = useState<number[]>([]);
  const [isQuizChecked, setIsQuizChecked] = useState<number[]>([]);
  const [selectType, setSelectType] = useState('Все отделы');
  const [isChooseQuizzesPopupOpen, setIsChooseQuizzesPopupOpen] = useState(false);
  const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = useState(false);
  const [isNewEmployeePopupOpen, setIsNewEmploeePopupOpen] = useState(false);

  const [staffOnPage, setStaffOnPage] = useState(staff);

  const staffNameFilter = staffOnPage?.filter(
    ({ firstName, lastName, patronymic }) => (
      firstName.toLowerCase().indexOf(searchEmployee.toLowerCase()) > -1
      || lastName.toLowerCase().indexOf(searchEmployee.toLowerCase()) > -1
      || patronymic.toLowerCase().indexOf(searchEmployee.toLowerCase()) > -1
    ),
  );

  const staffDepartmentFilter = (type: string) => {
    setSelectType(type);
    type === 'Все отделы'
      ? setStaffOnPage(staff)
      : setStaffOnPage(staff.filter(({ department }) => department === type));
  };

  const departmentsList: { label: string; value: string; }[] = [];
  departments.map(({ name }) => departmentsList.push({
    label: name,
    value: name,
  }));

  const quizNameFilter = quizzes?.filter(
    ({ name }) => name.toLowerCase().indexOf(searchQuiz.toLowerCase()) > -1,
  );

  return (
    <>
      <StyledDiv>
        <StaffFilter
          departments={departmentsList}
          setSearch={setSearchEmployee}
          search={searchEmployee}
          type={selectType}
          setType={staffDepartmentFilter}
          setIsChooseQuizzesPopupOpen={setIsChooseQuizzesPopupOpen}
          setIsNewEmploeePopupOpen={setIsNewEmploeePopupOpen}
          isChecked={isEmployeeChecked} />
        <StaffList
          staffList={searchEmployee !== '' ? staffNameFilter : staffOnPage}
          departments={selectType === 'Все отделы' ? departmentsList : selectType}
          search={searchEmployee}
          isChecked={isEmployeeChecked}
          setIsChecked={setIsEmployeeChecked} />
      </StyledDiv>
      <ChooseQuizzesPopup
        isChecked={isQuizChecked}
        setIsChecked={setIsQuizChecked}
        quizzes={searchQuiz !== '' ? quizNameFilter : quizzes}
        search={searchQuiz}
        setSearch={setSearchQuiz}
        setIsChooseQuizzesPopupOpen={setIsChooseQuizzesPopupOpen}
        setIsConfirmationPopupOpen={setIsConfirmationPopupOpen}
        isChooseQuizzesPopupOpen={isChooseQuizzesPopupOpen}
        setIsEmployeeChecked={setIsEmployeeChecked} />
      <ConfirmationPopup
        title='Квизы назначены'
        icon='check'
        description='Проверить назначение квизов можно в разделе «Назначенные квизы»'
        blueButton='Вернуться к списку'
        whiteButton='Проверить'
        isConfirmationPopupOpen={isConfirmationPopupOpen}
        setIsConfirmationPopupOpen={setIsConfirmationPopupOpen}
        blueButtonLink=''
        whiteButtonLink='/adm-quizzes' />
      <NewEmployeePopup
        isNewEmployeePopupOpen={isNewEmployeePopupOpen}
        setIsNewEmploeePopupOpen={setIsNewEmploeePopupOpen}
        departments={departmentsList} />
    </>
  );
};

export default Staff;
