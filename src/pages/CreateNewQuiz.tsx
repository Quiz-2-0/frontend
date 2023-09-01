/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { Title } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import { Icon20ChevronRight, Icon24AddOutline } from '@vkontakte/icons';
import React, { FC, useState, useEffect } from 'react';
import { useParams } from 'react-router';
import StyledButton from '@/ui-lib/styled-components/StyledButton';
import StyledDiv from '@/ui-lib/styled-components/StyledDiv';
import ProgressBar from '@/ui-lib/widgets/ProgressBar';
import steps, { Step, StepProps } from '@/constants/steps';
import StyledBackAndForwardButton from '@/ui-lib/styled-components/StyledBackAndForwardButton';
import ConfirmationPopup from '@/ui-lib/popups/ConfirmationPopup';
import {
  useUpdateVolumeMutation,
  useCreateVolumeMutation,
  useGetQuestionsQuery,
} from '@/api/api';
import { IQuestionAdmin, Volume, IVolumeItem } from '@/types/types';

const CreateNewQuiz: FC = () => {
  const { id } = useParams();
  const { data: questions } = useGetQuestionsQuery(Number(id));
  const [isPublished, setIsPublished] = useState(false);
  const [questionsList, setQuestionsList] = useState<IQuestionAdmin[]>(questions ?? [{
    id: 0,
    question_type: '',
    text: '',
    answers: [{
      id: 0,
      text: '',
      answers: [],
      answers_list: [],
    }],
  }]);
  const [quizId, setQuizId] = useState(Number(id));
  const [progressObject, setProgress] = useState<number[]>([0]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = useState(false);
  const [isPreviewPopupOpen, setIsPreviewPopupOpen] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isSubmit, setIsSubmit] = useState([false, false, false, false]);

  const [updateVolumeRun] = useUpdateVolumeMutation();
  const [createVolumeRun] = useCreateVolumeMutation();

  const [isQuestionTextValid, setIsQuestionTextValid] = useState<{
    id: number,
    isValid: boolean,
  }[]>(questions?.map((question) => (
    { id: question.id, isValid: true })) ?? [{ id: 0, isValid: true }]);
  const [isQuestionTypeValid, setIsQuestionTypeValid] = useState<{
    id: number,
    isValid: boolean,
  }[]>(questions?.map((question) => (
    { id: question.id, isValid: true })) ?? [{ id: 0, isValid: true }]);
  useEffect(() => {
    setQuestionsList(questions ?? [{
      id: 0,
      question_type: '',
      text: '',
      answers: [{
        id: 0,
        text: '',
        answers: [],
        answers_list: [],
      }],
    }]);
  }, [questions]);

  const [volumeItems, setVolumeItems] = useState<IVolumeItem[]>([{
    volume: {
      id: 0,
      name: '',
      description: '',
    },
    isNew: false,
    isChanged: false,
    isValid: true,
  }]);
  const [newVolumeIdx, setNewVolumeIdx] = useState(-1);

  useEffect(() => {
    if (questionsList.length === 0) {
      setQuestionsList([{
        id: 0,
        question_type: '',
        text: '',
        answers: [],
      }]);
      setIsQuestionTextValid([{ id: 0, isValid: true }]);
      setIsQuestionTypeValid([{ id: 0, isValid: true }]);
    }
  }, [questionsList]);

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

  const createOrUpdateVolume = async (volumeItem: IVolumeItem) => {
    const { volume } = volumeItem;
    if (!volumeItem.isChanged) return;
    if (!volume.id || !volume.name || !volume.description) return;

    try {
      let newVolume: Volume;

      if (volumeItem.isNew) {
        newVolume = await createVolumeRun({
          quizId,
          volume: {
            name: volume.name,
            description: volume.description,
          },
        }).unwrap();
      } else {
        newVolume = await updateVolumeRun({
          quizId,
          volumeId: volume.id,
          volume: {
            name: volume.name,
            description: volume.description,
          },
        }).unwrap();
      }

      setVolumeItems(volumeItems.map(({ volume: volOld, ...otherProps }) => {
        if (volOld.id !== volume.id) {
          return { volume: volOld, ...otherProps };
        }
        return {
          volume: {
            ...newVolume,
          },
          ...otherProps,
          isChanged: false,
          isNew: false,
          isValid: true,
        };
      }));
    } catch (err) {
      console.error(err);
    }
  };

  const saveDrafts = async () => {
    // eslint-disable-next-line no-restricted-syntax
    for (const volumeItem of volumeItems) {
      if (volumeItem.isChanged) {
        // eslint-disable-next-line no-await-in-loop
        await createOrUpdateVolume(volumeItem);
      }
    }
  };

  const addNewItem = async () => {
    if (currentPage === 1) {
      setQuestionsList([...questionsList, {
        id: questionsList.length,
        question_type: '',
        text: '',
        answers: [{
          id: 0,
          text: '',
          answers_list: [],
        }],
      }]);
      setIsQuestionTextValid([
        ...isQuestionTextValid,
        { id: isQuestionTextValid.length, isValid: true },
      ]);
      setIsQuestionTypeValid([
        ...isQuestionTypeValid,
        { id: isQuestionTypeValid.length, isValid: true },
      ]);
    }
    if (currentPage === 2) {
      await saveDrafts();
      setNewVolumeIdx(newVolumeIdx - 1);
      setVolumeItems([...volumeItems, {
        volume: {
          id: newVolumeIdx,
          name: '',
          description: '',
        },
        isNew: true,
        isChanged: false,
        isValid: true,
      }]);
    }
  };

  const renderStep = () => {
    const step: Step<StepProps> = steps[currentPage];
    return (
      <step.markup.Component
        saveDrafts={saveDrafts}
        setNextPage={setNextPage}
        volumeItems={volumeItems}
        quizId={quizId}
        questionsList={questionsList}
        setVolumeItems={setVolumeItems}
        isSubmit={isSubmit}
        setIsSubmit={setIsSubmit}
        setQuizId={setQuizId}
        setIsButtonDisabled={setIsButtonDisabled}
        formElements={currentPage === 1
          ? {
            isQuestionTextValid,
            isQuestionTypeValid,
          } : {}}
        setFormElements={currentPage === 1
          ? {
            setQuestionsList,
            setIsQuestionTextValid,
            setIsQuestionTypeValid,
          } : []} />
    );
  };
  console.log(volumeItems);
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
              onClick={() => {
                setIsConfirmationPopupOpen(true);
                setIsPublished(false);
              }}>
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
                  disabled={!isButtonDisabled}
                  onClick={() => setIsSubmit(
                    isSubmit.map((val, i) => (i === currentPage ? true : val)),
                  )}
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
          {currentPage !== 0 && (
            <StyledButton
              disabled={!isButtonDisabled}
              mode='outline'
              onClick={async () => {
                if (currentPage !== 3) {
                  await addNewItem();
                } else {
                  setIsPreviewPopupOpen(true);
                }
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
          <StyledButton
            onClick={() => {
              setIsSubmit(isSubmit.map((val, i) => (i === currentPage ? true : val)));
              if (currentPage === 3) {
                setIsConfirmationPopupOpen(true);
                setIsPublished(true);
              }
            }}
            type='button'
            disabled={!isButtonDisabled}
            style={{ marginTop: '24px', width: '100%', maxWidth: '210px' }}>
            {currentPage !== 3 ? 'Продолжить' : 'Опубликовать'}
          </StyledButton>
        </div>
      </div>
      <ConfirmationPopup
        quizId={quizId}
        isConfirmationPopupOpen={isConfirmationPopupOpen}
        setIsConfirmationPopupOpen={setIsConfirmationPopupOpen}
        setIsChooseQuizzesPopupOpen={NaN}
        title={isPublished ? 'Публикация' : 'Черновик сохранён'}
        icon={isPublished ? 'none' : 'check'}
        description={isPublished
          ? 'После подтверждения публикации квиз появится в разделе «Квизы» и будет доступен для назначения сотрудникам'
          : 'Вернуться к черновику и продолжить создание квиза можно в любой момент'}
        blueButton={isPublished ? 'Подтвердить' : 'Продолжить'}
        whiteButton={isPublished ? 'Отменить' : 'Выйти'}
        blueButtonLink={isPublished ? '/new-quiz' : ''}
        whiteButtonLink={isPublished ? '' : '/new-quiz'} />
    </>
  );
};

export default CreateNewQuiz;
