import Wrapper from '../assets/wrapper/Quiz';
import Question from './Question';
import { useAppContext } from '../context/appContext';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const Quiz = () => {
  const {
    queue,
    result,
    trace,
    isCheck,
    moveNextQuestion,
    movePrevQuestion,
    pushAnswer,
    updateAnswer,
    setUncheckedAnswer,
  } = useAppContext();

  const [checked, setChecked] = useState(undefined);

  useEffect(() => {
    updateAnswer({ trace, checked });
  }, [checked]);

  const onNext = () => {
    if (trace > queue.length - 1) return;

    // load the next question
    moveNextQuestion();

    if (result.length <= trace) {
      // in case user does not select any answers, add to result array 'undefined' before move to next question
      if (!isCheck) {
        pushAnswer(undefined);
      } else {
        pushAnswer(checked);
      }
    }

    setUncheckedAnswer();
  };

  const onPrev = () => {
    if (trace < 1) return;

    movePrevQuestion();
  };

  const onChecked = check => {
    if (check === checked) {
      updateAnswer({ trace, checked });
    }
    setChecked(check);
  };

  if (result.length && result.length >= queue.length) {
    return <Navigate to="/result" />;
  }

  return (
    <Wrapper>
      <div className="container">
        <h1 className="title">quiz</h1>

        <Question onChecked={onChecked} />

        <div className="grid">
          {trace > 0 ? (
            <button className="btn btn-block" onClick={onPrev}>
              prev
            </button>
          ) : (
            <div></div>
          )}

          <button className="btn btn-block" onClick={onNext}>
            {trace === queue.length - 1 ? 'Finish' : 'Next'}
          </button>
        </div>
      </div>
    </Wrapper>
  );
};

export default Quiz;
