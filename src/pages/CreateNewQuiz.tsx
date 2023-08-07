/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Button, Title } from '@vkontakte/vkui';
import { Icon24UserOutline, Icon20ChevronRight } from '@vkontakte/icons';
import React, { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import StyledButton from '../ui-lib/styled-components/StyledButton';
import StyledDiv from '../ui-lib/styled-components/StyledDiv';
import ProgressBar from '../ui-lib/widgets/ProgressBar';
import steps from '../constants/steps';
import StyledBackAndForwardButton from '../ui-lib/styled-components/StyledBackAndForwardButton';
import NewQuizStep1 from '../ui-lib/widgets/NewQuizStep1';

const CreateNewQuiz: FC = () => {
  const navigate = useNavigate();
  const [progressObject, setProgress] = useState<number[]>([0]);
  const [currentPage, setCurrentPage] = useState<number>(0);

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
    const step = steps[currentPage];
    return <step.markup.Component />;
  };

  return (
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
            onClick={() => navigate('/new-quiz')}>
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
      <StyledDiv style={{ paddingBottom: 0, height: 'min-content' }}>
        {renderStep()}
      </StyledDiv>
      <StyledButton onClick={() => setNextPage()} style={{ marginTop: '24px', width: '167px' }}>Продолжить</StyledButton>
    </div>
  );
};

export default CreateNewQuiz;
