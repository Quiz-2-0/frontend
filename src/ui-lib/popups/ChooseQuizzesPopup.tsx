/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { FormItem, IconButton, Search } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import React, { FC } from 'react';
import styled from 'styled-components';
import { Icon24CancelOutline } from '@vkontakte/icons';
import { TableTitle, TableItem } from '../styled-components/TableItems';
import StyledCheckbox from '../styled-components/StyledCheckbox';
import StyledButton from '../styled-components/StyledButton';
import Background from '../styled-components/Background';
import { AdminQuiz } from '@/types/types';
import { useAssignQuizzesToUsersMutation } from '@/api/apiv2';

const StyledDiv = styled.div`
  max-width: 1080px;
  height: 692px;
  width: 100%;
  padding: 48px;
  box-sizing: border-box;
  background: white;
  border-radius: 16px;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.06),
    0 4px 8px 0 rgba(0, 0, 0, 0.04);
`;

const ChooseQuizzesPopup: FC<{
  setIsChooseQuizzesPopupOpen: any,
  setIsConfirmationPopupOpen: any,
  setIsNewEmployeeAdd: any,
  isChooseQuizzesPopupOpen: boolean,
  quizzes: AdminQuiz[] | undefined,
  search: string,
  setSearch: any,
  isChecked: number[],
  setIsChecked: any,
  setIsEmployeeChecked: any,
  isEmployeeChecked: number[],
}> = ({
  setIsChooseQuizzesPopupOpen,
  isChooseQuizzesPopupOpen,
  setIsConfirmationPopupOpen,
  quizzes,
  search,
  setSearch,
  isChecked,
  setIsChecked,
  setIsEmployeeChecked,
  isEmployeeChecked,
  setIsNewEmployeeAdd,
}) => {
  const [assignQuizzesToUsers] = useAssignQuizzesToUsersMutation();
  const assignQuizzes = async () => {
    await assignQuizzesToUsers({
      users: isEmployeeChecked.map((userId) => ({ id: userId })),
      quizes: isChecked.map((quizId) => ({ id: quizId })),
    });
    setIsNewEmployeeAdd(false);
    setIsConfirmationPopupOpen(true);
    setIsChooseQuizzesPopupOpen(false);
    setIsChecked([]);
    setIsEmployeeChecked([]);
  };

  return (
    <Background
      style={{
        visibility: `${isChooseQuizzesPopupOpen ? 'visible' : 'hidden'}`,
        opacity: `${isChooseQuizzesPopupOpen ? '1' : '0'}`,
      }}>
      <StyledDiv>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
          }}>
          <IconButton
            aria-label='Закрыть'
            style={{ width: '28px', height: '28px' }}
            onClick={() => {
              setIsChooseQuizzesPopupOpen(false);
              setIsChecked([]);
            }}>
            <Icon24CancelOutline fill='#3F8AE0' />
          </IconButton>
          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              margin: '40px 0 24px',
            }}>
            <h2
              style={{
                margin: 0,
                fontSize: '20px',
                fontWeight: '600',
                lineHeight: '24px',
                letterSpacing: '0.38px',
              }}>
              Выбор квиза
            </h2>
            <Search
              style={{
                maxWidth: '360px',
                width: '100%',
                margin: '0',
                padding: '0',
              }}
              value={search}
              onChange={(e) => setSearch(e.target.value)} />
          </div>
          <StyledDiv style={{ height: '396px', margin: 0, padding: '24px' }}>
            <FormItem style={{ padding: '0' }}>
              <StyledCheckbox
                style={{ marginBottom: '20px' }}
                checked={isChecked.length === quizzes?.length && quizzes?.length !== 0}
                onClick={() => (
                  isChecked.length === quizzes?.length
                    ? setIsChecked([])
                    : setIsChecked(quizzes?.map((quiz: AdminQuiz) => quiz.id))
                )}>
                <TableTitle style={{ maxWidth: '336px' }}>Название</TableTitle>
                <TableTitle style={{ maxWidth: '180px' }}>Отдел</TableTitle>
                <TableTitle style={{ maxWidth: '152px' }}>Категория</TableTitle>
                <TableTitle style={{ maxWidth: '100px' }}>Уровень</TableTitle>
              </StyledCheckbox>
              <div style={{ height: '328px', overflow: 'scroll' }}>
                {quizzes?.length === 0 || quizzes === undefined
                  ? (
                    <p
                      style={{
                        fontSize: '16px',
                        color: '#818C99',
                        paddingLeft: '72px',
                      }}>
                      По вашему запросу ничего не найдено
                    </p>
                  ) : quizzes.map((quiz) => (
                    <StyledCheckbox
                      style={{ marginTop: '16px' }}
                      key={quiz.id}
                      checked={isChecked.includes(quiz.id)}
                      onClick={() => (
                        isChecked.includes(quiz.id)
                          ? setIsChecked(isChecked.filter((num) => num !== quiz.id))
                          : setIsChecked([...isChecked, quiz.id])
                      )}>
                      <TableItem style={{ maxWidth: '336px' }}>
                        {quiz.name}
                      </TableItem>
                      <TableItem style={{ maxWidth: '180px' }}>
                        {quiz.directory || 'Для всех отделов'}
                      </TableItem>
                      <TableItem style={{ maxWidth: '152px' }}>
                        {quiz.tags[0]?.name ?? null}
                      </TableItem>
                      <TableItem style={{ maxWidth: '100px' }}>{quiz.level}</TableItem>
                    </StyledCheckbox>
                  ))}
              </div>
            </FormItem>
          </StyledDiv>
          <StyledButton
            disabled={isChecked.length === 0}
            style={{ minWidth: '167px', marginTop: '28px' }}
            onClick={assignQuizzes}>
            Назначить
          </StyledButton>
        </div>
      </StyledDiv>
    </Background>
  );
};

export default ChooseQuizzesPopup;
