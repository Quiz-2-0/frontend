/* eslint-disable ternary/nesting */
/* eslint-disable no-nested-ternary */
/* eslint-disable ternary/no-unreachable */
/* eslint-disable react-hooks/exhaustive-deps */
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
import { IUser } from '@/types/types';
import { useGetQuizzesQuery, useGetDepartmentsQuery, useGetUsersQuery } from '@/api/apiv2';

const StyledDiv = styled.div`
  width: 100%;
`;

const Staff: FC = () => {
  const [searchEmployee, setSearchEmployee] = useState('');
  const [searchQuiz, setSearchQuiz] = useState('');

  const [isEmployeeChecked, setIsEmployeeChecked] = useState<number[]>([]);
  const [isQuizChecked, setIsQuizChecked] = useState<number[]>([]);

  const [selectType, setSelectType] = useState<{ id: number, name: string }[]>([{ id: 0, name: 'Все отделы' }]);

  const [isChooseQuizzesPopupOpen, setIsChooseQuizzesPopupOpen] = useState(false);
  const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = useState(false);
  const [isNewEmployeeAdd, setIsNewEmployeeAdd] = useState(false);
  const [isNewEmployeePopupOpen, setIsNewEmploeePopupOpen] = useState(false);

  const { data: staff } = useGetUsersQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const { data: quizzes } = useGetQuizzesQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const { data: departments } = useGetDepartmentsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const [staffOnPage, setStaffOnPage] = useState(staff?.filter(({ role }) => role !== 'AD'));
  const [staffNameFilter, setStaffNameFilter] = useState<IUser[] | undefined>(staffOnPage?.filter(
    ({ firstName, lastName, patronymic }) => (
      firstName.toLowerCase().indexOf(searchEmployee.toLowerCase()) > -1 ||
      lastName.toLowerCase().indexOf(searchEmployee.toLowerCase()) > -1 ||
      patronymic.toLowerCase().indexOf(searchEmployee.toLowerCase()) > -1
    ),
  ));
  const [departmentsList, setDepartmentsList] = useState<{
    label: string,
    value: number,
  }[] | undefined>(departments?.filter(({ name }) => (
    staff?.filter(({ department }) => department === name).length !== 0
  )).map(({ id, name }) => ({
    label: name,
    value: id,
  })));

  const staffDepartmentFilter = (type: number) => {
    const newType = departments?.filter(({ id }) => id === type) ?? [{ name: 'Все отделы', id: 0 }];
    setSelectType(newType.length === 0 ? [{ name: 'Все отделы', id: 0 }] : newType);
    type === 0
      ? setStaffOnPage(staff)
      : setStaffOnPage(staff?.filter(({ department }) => department === newType[0].name));
    console.log(type, newType, selectType);
  };

  const quizNameFilter = quizzes?.filter(
    ({ name }) => name.toLowerCase().indexOf(searchQuiz.toLowerCase()) > -1,
  );

  useEffect(() => {
    setStaffOnPage(staff);
    setStaffNameFilter(staffOnPage?.filter(
      ({ firstName, lastName, patronymic }) => (
        firstName.toLowerCase().indexOf(searchEmployee.toLowerCase()) > -1 ||
        lastName.toLowerCase().indexOf(searchEmployee.toLowerCase()) > -1 ||
        patronymic.toLowerCase().indexOf(searchEmployee.toLowerCase()) > -1
      ),
    ));
    setDepartmentsList(departments?.filter(({ name }) => (
      staff?.filter(({ department }) => department === name).length !== 0
    )).map(({ id, name }) => ({
      label: name,
      value: id,
    })));
  }, [staff, quizzes, departments, searchEmployee]);

  return (
    <>
      <StyledDiv>
        <StaffFilter
          departments={[{ label: 'Все отделы', value: 0 }].concat(departmentsList ?? [])}
          setSearch={setSearchEmployee}
          search={searchEmployee}
          type={selectType}
          setType={staffDepartmentFilter}
          setIsChooseQuizzesPopupOpen={setIsChooseQuizzesPopupOpen}
          setIsNewEmploeePopupOpen={setIsNewEmploeePopupOpen}
          isChecked={isEmployeeChecked} />
        <StaffList
          staffList={searchEmployee !== '' ? staffNameFilter : staffOnPage}
          departments={selectType[0].name === 'Все отделы'
            ? departmentsList
            : [{ label: selectType[0].name, value: selectType[0].id }]}
          search={searchEmployee}
          isChecked={isEmployeeChecked}
          setIsChecked={setIsEmployeeChecked} />
      </StyledDiv>
      <ChooseQuizzesPopup
        setIsNewEmployeeAdd={setIsNewEmployeeAdd}
        isChecked={isQuizChecked}
        setIsChecked={setIsQuizChecked}
        quizzes={searchQuiz !== '' ? quizNameFilter : quizzes}
        search={searchQuiz}
        setSearch={setSearchQuiz}
        setIsChooseQuizzesPopupOpen={setIsChooseQuizzesPopupOpen}
        setIsConfirmationPopupOpen={setIsConfirmationPopupOpen}
        isChooseQuizzesPopupOpen={isChooseQuizzesPopupOpen}
        setIsEmployeeChecked={setIsEmployeeChecked}
        isEmployeeChecked={isEmployeeChecked} />
      <ConfirmationPopup
        quizId={isNewEmployeeAdd
          ? NaN
          : (isQuizChecked.length === 1 ? isQuizChecked[0] : NaN)}
        title={isNewEmployeeAdd
          ? 'Новый сотрудник добавлен'
          : (isQuizChecked.length === 1 ? 'Квиз назначен' : 'Квизы назначены')}
        icon='check'
        description={isNewEmployeeAdd
          ? 'Новому сотруднику можно назначить квиз'
          : 'Проверить назначение квизов можно в разделе «Назначенные квизы»'}
        blueButton={isNewEmployeeAdd
          ? 'Назначить квиз'
          : 'Вернуться к списку'}
        whiteButton={isNewEmployeeAdd
          ? 'Вернуться к списку'
          : 'Проверить'}
        isConfirmationPopupOpen={isConfirmationPopupOpen}
        setIsConfirmationPopupOpen={setIsConfirmationPopupOpen}
        setIsChooseQuizzesPopupOpen={isNewEmployeeAdd ? setIsChooseQuizzesPopupOpen : NaN}
        blueButtonLink=''
        whiteButtonLink={isNewEmployeeAdd ? '' : '/adm-quizzes'} />
      <NewEmployeePopup
        setIsNewEmployeeAdd={setIsNewEmployeeAdd}
        setIsConfirmationPopupOpen={setIsConfirmationPopupOpen}
        isNewEmployeePopupOpen={isNewEmployeePopupOpen}
        setIsNewEmploeePopupOpen={setIsNewEmploeePopupOpen}
        departments={departmentsList} />
    </>
  );
};

export default Staff;
