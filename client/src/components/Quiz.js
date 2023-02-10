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
    moveNextQuestion,
    movePrevQuestion,
    pushAnswer,
  } = useAppContext();

  const [checked, setChecked] = useState(undefined);

  // const state = useAppContext();
  // useEffect(() => {
  //   console.log(state);
  // }, []);

  const onNext = () => {
    if (trace > queue.length - 1) return;

    moveNextQuestion();
    pushAnswer(checked);
  };

  const onPrev = () => {
    if (trace < 1) return;

    movePrevQuestion();
  };

  const onChecked = check => {
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
          <button className="btn btn-block" onClick={onPrev}>
            prev
          </button>
          <button className="btn btn-block" onClick={onNext}>
            next
          </button>
        </div>
      </div>
    </Wrapper>
  );
};

export default Quiz;
