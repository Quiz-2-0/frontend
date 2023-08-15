/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable no-console */
/* eslint-disable no-plusplus */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable ternary/nesting */
/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable ternary/no-unreachable */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable spaced-comment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import React, { useEffect, useState } from 'react';
import {
  Div,
  Title,
  Headline,
  Subhead,
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import { useParams } from 'react-router';
import StyledButton from '@/ui-lib/styled-components/StyledButton';
import { useGetQuizQuery, useSetAnswerMutation } from '@/api/apiv2';
import ProgressBar from '@/ui-lib/widgets/ProgressBar';
import { useDispatch } from '@/store/store.types';
import { setLoaderState } from '@/store/allSlice/allSlice';
import { TAnswerItem } from '@/types/types';
import Results from '@/ui-lib/widgets/Results';
import SingleChoiceQuestion from '@/ui-lib/widgets/SingleChoiceQuestion';
import MultipleChoiceQuestion from '@/ui-lib/widgets/MultipleChoiceQuestion';
import OpenEndedQuestion from '@/ui-lib/widgets/OpenEndedQuestion';
import DragAndDropQuestion from '@/ui-lib/widgets/DragAndDropQuestion';

const QuizQuestion: React.FC = () => {
  const { id = 0 } = useParams();
  const { data, error, isLoading } = useGetQuizQuery(Number(id));
  const [setAnswer, result] = useSetAnswerMutation();
  const [progressObject, setProgress] = useState<Record<number, string>>({});

  const [currentPage, setCurrentPage] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<TAnswerItem[]>([]);
  const [questions, setQuestions] = useState(data ? data.questions : []);

  console.log(data);

  useEffect(() => {
    setQuestions(data ? data.questions : []);
  }, [data]);

  const selectAnswer = (answerId: number) => {
    setSelectedAnswers([
      {
        answer: answerId,
        answer_list: [],
      },
    ]);
  };

  const selectAnswers = (answerIds: number[]) => {
    const answers: TAnswerItem[] = [];
    answerIds.forEach((id) => {
      answers.push({
        answer: id,
        answer_list: [], //todo Что это?
      });
    });
    setSelectedAnswers(answers);
  };

  const getMultipleChoiceAnswerIds = () => {
    const ids:number[] = [];
    selectedAnswers.forEach((answer) => {
      ids.push(answer.answer ?? 0);
    });
    return ids;
  };

  const selectAnswerText = (text:string) => {
    const answerId = questions[currentPage].answers[0].id;

    setSelectedAnswers([{
      answer: answerId,
      answer_text: text,
      answer_list: [], //todo Что это?
    }]);
  };

  const setNextPage = async () => {
    const requestObject = {
      quizId: id,
      id: questions[currentPage].id,
      question_type: questions[currentPage].question_type,
      response_time: 0, // todo Что это?
      answers: selectedAnswers,
    };
    await setAnswer(requestObject);
    setCurrentPage(currentPage + 1);
    selectAnswers([]);
    if (currentPage !== questions.length) {
      setProgress({ ...progressObject, [currentPage]: ' ' });
    }
  };

  return (
    <Div style={{ padding: 0, width: '100%', maxWidth: '914px' }}>
      <Title
        weight='3'
        style={{ padding: '10px 0 40px', fontWeight: 500 }}>
        {currentPage === questions.length ? '' : `Квиз «${data?.name}»`}
      </Title>
      {currentPage === questions.length
        ? (
          <Results
            questions={questions.length}
            quizName={data?.name} />
        ) : (
          <>
            <ProgressBar questionArr={questions} progressObject={progressObject} />
            <Headline weight='3' style={{ marginTop: '32px' }}>{`Вопрос ${currentPage + 1}/${data?.question_amount}`}</Headline>
            <Title style={{
              margin: '20px 0 0 0',
              fontSize: '20px',
              fontWeight: 600,
              lineHeight: '24px',
              letterSpacing: '0.38px',
            }}>
              {questions[currentPage].text}
            </Title>
            <Subhead
              weight='2'
              style={{
                margin: '8px 0 20px',
                color: '#818C99',
              }}>
              Текст для подсказки
            </Subhead>
            {(() => {
              switch (questions[currentPage].question_type) {
                case 'ONE':
                  return (
                    <SingleChoiceQuestion
                      currentPage={currentPage}
                      questions={questions}
                      selectedAnswer={selectedAnswers[0]}
                      selectAnswer={selectAnswer} />
                  );
                case 'MNY':
                  return (
                    <MultipleChoiceQuestion
                      currentPage={currentPage}
                      questions={questions}
                      selectAnswers={selectAnswers}
                      selectedAnswers={getMultipleChoiceAnswerIds()} />
                  );
                case 'OPN':
                  return (
                    <OpenEndedQuestion selectAnswerText={selectAnswerText} />
                  );
                case 'LST':
                  return (
                    <DragAndDropQuestion
                      boardTitles={
                      [
                        {
                          id: 0,
                          text: '123',
                          items: [{ id: 0, text: '123' }],
                        }]
                    }
                      answers={[{ id: 0, text: '123' }]} />
                  );
                default:
                  return null;
              }
            })()}
            <StyledButton onClick={setNextPage} disabled={selectedAnswers.length === 0} style={{ width: '167px', margin: '32px auto 0' }}>Дальше</StyledButton>
          </>
        )}
    </Div>
  );
};

export default QuizQuestion;
