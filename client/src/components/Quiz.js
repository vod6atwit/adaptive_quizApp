import Wrapper from '../assets/wrapper/Quiz';
import Question from './Question';
import { useAppContext } from '../context/appContext';
import { useEffect } from 'react';

const Quiz = () => {
  const { queue, trace, moveNextQuestion, movePrevQuestion, pushAnswer } =
    useAppContext();

  // const state = useAppContext();
  // useEffect(() => {
  //   console.log(state);
  // }, []);

  const onNext = () => {
    if (trace >= queue.length - 1) return;

    moveNextQuestion();

    const result = 1;
    pushAnswer(result);
  };

  const onPrev = () => {
    if (trace < 1) return;

    movePrevQuestion();
  };

  return (
    <Wrapper>
      <div className="container">
        <h1 className="title">quiz</h1>

        <Question />

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
