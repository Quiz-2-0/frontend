/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable no-plusplus */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import StaffFilter from '@/ui-lib/widgets/StaffFilters';
import StaffList from '@/ui-lib/widgets/StaffList';
import ChooseQuizzesPopup from '@/ui-lib/popups/ChooseQuizzesPopup';
import ConfirmationPopup from '@/ui-lib/popups/ConfirmationPopup';
import NewEmployeePopup from '@/ui-lib/popups/NewEmployeePopup';
import { useGetDepartmentsQuery, useGetQuizzesQuery, useGetUsersQuery } from '@/api/apiv2';
import { IUser } from '@/types/types';

const StyledDiv = styled.div`
  width: 100%;
`;

const Staff: FC = () => {
  const [searchEmployee, setSearchEmployee] = useState('');
  const [searchQuiz, setSearchQuiz] = useState('');

  const [isEmployeeChecked, setIsEmployeeChecked] = useState<number[]>([]);
  const [isQuizChecked, setIsQuizChecked] = useState<number[]>([]);

  const [selectType, setSelectType] = useState('Все отделы');

  const [isChooseQuizzesPopupOpen, setIsChooseQuizzesPopupOpen] = useState(false);
  const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = useState(false);
  const [isNewEmployeePopupOpen, setIsNewEmploeePopupOpen] = useState(false);

  const { data: staff } = useGetUsersQuery();
  const { data: quizzes } = useGetQuizzesQuery();
  const { data: departments } = useGetDepartmentsQuery();
  const [staffOnPage, setStaffOnPage] = useState(staff);

  let staffNameFilter: IUser[] | undefined = staffOnPage?.filter(
    ({ firstName, lastName, patronymic }) => (
      firstName.toLowerCase().indexOf(searchEmployee.toLowerCase()) > -1 ||
      lastName.toLowerCase().indexOf(searchEmployee.toLowerCase()) > -1 ||
      patronymic.toLowerCase().indexOf(searchEmployee.toLowerCase()) > -1
    ),
  );
  let departmentsList: { label: string; value: string; }[] | undefined =
  departments?.map(({ name }) => ({
    label: name,
    value: name,
  }));

  const staffDepartmentFilter = (type: string) => {
    setSelectType(type);
    type === 'Все отделы'
      ? setStaffOnPage(staff)
      : setStaffOnPage(staff?.filter(({ department }) => department === type));
  };

  const quizNameFilter = quizzes?.filter(
    ({ name }) => name.toLowerCase().indexOf(searchQuiz.toLowerCase()) > -1,
  );

  useEffect(() => {
    console.log(staff, quizzes, departments);
    setStaffOnPage(staff);
    staffNameFilter = staffOnPage?.filter(
      ({ firstName, lastName, patronymic }) => (
        firstName.toLowerCase().indexOf(searchEmployee.toLowerCase()) > -1 ||
        lastName.toLowerCase().indexOf(searchEmployee.toLowerCase()) > -1 ||
        patronymic.toLowerCase().indexOf(searchEmployee.toLowerCase()) > -1
      ),
    );
    departmentsList = departments?.map(({ name }) => ({
      label: name,
      value: name,
    }));
  }, [staff, quizzes, departments, searchEmployee]);

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
