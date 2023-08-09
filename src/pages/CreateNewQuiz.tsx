/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable ternary/no-unreachable */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Title } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import { Icon20ChevronRight, Icon24AddOutline } from '@vkontakte/icons';
import React, { FC, useState } from 'react';
import { useNavigate } from 'react-router';
import StyledButton from '@/ui-lib/styled-components/StyledButton';
import StyledDiv from '@/ui-lib/styled-components/StyledDiv';
import ProgressBar from '@/ui-lib/widgets/ProgressBar';
import steps, { Step, StepProps } from '@/constants/steps';
import StyledBackAndForwardButton from '@/ui-lib/styled-components/StyledBackAndForwardButton';
import ConfirmationPopup from '@/ui-lib/popups/ConfirmationPopup';

const CreateNewQuiz: FC = () => {
  const navigate = useNavigate();
  const [progressObject, setProgress] = useState<number[]>([0]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = useState(false);
  const [items, setItems] = useState<number[]>([0]);
  const [isPreviewPopupOpen, setIsPreviewPopupOpen] = useState(false);

  const [questionText, setQuestionText] = useState<string[]>(['']);
  const [questionType, setQuestionType] = useState<string[]>(['']);
  const [isQuestionTextValid, setIsQuestionTextValid] = useState<boolean[]>([true]);
  const [isQuestionTypeValid, setIsQuestionTypeValid] = useState<boolean[]>([true]);

  const setNextPage = () => {
    setCurrentPage(currentPage + 1);
    if (currentPage !== steps.length) {
      setProgress([...progressObject, currentPage]);
    }
  };

  const setPreviousPage = () => {
    setCurrentPage(currentPage - 1);
    if (currentPage !== steps.length) {
      setProgress(progressObject.slice(0, currentPage));
    }
  };

  const renderStep = () => {
    const step: Step<StepProps> = steps[currentPage];
    return (
      <step.markup.Component
        items={items}
        setItems={setItems}
        formElements={currentPage === 1
          ? {
            questionText,
            questionType,
            isQuestionTextValid,
            isQuestionTypeValid,
          } : {}}
        setFormElements={currentPage === 1
          ? {
            setQuestionText,
            setQuestionType,
            setIsQuestionTextValid,
            setIsQuestionTypeValid,
          } : []} />
    );
  };

  const addNewItem = () => {
    setItems([...items, items.length]);
    if (currentPage === 1) {
      setQuestionText([...questionText, '']);
      setQuestionType([...questionType, '']);
      setIsQuestionTextValid([...isQuestionTextValid, true]);
      setIsQuestionTypeValid([...isQuestionTypeValid, true]);
    }
  };

  return (
    <>
      <div style={{ width: '100%' }}>
        <StyledDiv
          style={{
            marginBottom: '24px',
          }}>
          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '24px',
            }}>
            <Title level='1'>Создание квиза</Title>
            <StyledButton
              mode='outline'
              style={{ margin: 0 }}
              onClick={() => setIsConfirmationPopupOpen(true)}>
              Сохранить черновик
            </StyledButton>
          </div>
          <ProgressBar progressObject={progressObject} questionArr={steps} />
          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: '16px',
            }}>
            <Title level='2'>{steps[currentPage].name}</Title>
            <div
              style={{
                maxWidth: '292px',
                width: '100%',
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
                gap: '16px',
              }}>
              {currentPage !== 0 && (
                <StyledBackAndForwardButton
                  mode='link'
                  onClick={() => setPreviousPage()}>
                  <Icon20ChevronRight style={{ transform: 'rotate(180deg)' }} />
                  Предыдущий шаг
                </StyledBackAndForwardButton>
              )}
              {currentPage !== 3 && (
                <StyledBackAndForwardButton
                  onClick={() => setNextPage()}
                  mode='link'>
                  Следующий шаг
                  <Icon20ChevronRight />
                </StyledBackAndForwardButton>
              )}
            </div>
          </div>
        </StyledDiv>
        {renderStep()}
        <div
          style={{
            maxWidth: '436px',
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '16px',
          }}>
          {currentPage !== 0 &&
            (
              <StyledButton
                mode='outline'
                onClick={() => {
                  currentPage !== 3 ? addNewItem() : setIsPreviewPopupOpen(true);
                }}
                style={{
                  marginTop: '24px',
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '8px',
                }}>
                {steps[currentPage].button.icon === 'add' && <Icon24AddOutline />}
                {steps[currentPage].button.name}
              </StyledButton>
            )}
          <StyledButton onClick={() => setNextPage()} type='button' style={{ marginTop: '24px', width: '100%', maxWidth: '210px' }}>
            {currentPage !== 3 ? 'Продолжить' : 'Опубликовать'}
          </StyledButton>
        </div>
      </div>
      <ConfirmationPopup
        isConfirmationPopupOpen={isConfirmationPopupOpen}
        setIsConfirmationPopupOpen={setIsConfirmationPopupOpen}
        title='Черновик сохранён'
        icon='check'
        description='Вернуться к черновику и продолжить создание квиза можно в любой момент'
        blueButton='Продолжить'
        whiteButton='Выйти'
        blueButtonLink=''
        whiteButtonLink='/new-quiz' />
    </>
  );
};

export default CreateNewQuiz;
