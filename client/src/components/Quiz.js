import Wrapper from '../assets/wrapper/Quiz';
import Question from './Question';

const Quiz = () => {
  const onNext = () => {
    console.log('Next Quiz');
  };

  const onPrev = () => {
    console.log('Prev Quiz');
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
