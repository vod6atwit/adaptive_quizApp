import React from 'react';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import Wrapper from '../assets/wrapper/Main';

const Main = () => {
  const inputRef = useRef(null);

  return (
    <Wrapper>
      <div className="container">
        <h1 className="title text-light">Read before you start the quiz</h1>

        <ol>
          <li>You will be asked 10 questions one after another.</li>
          <li>10 points is awared for the correct answer.</li>
          <li>
            Each question has three options. You can choose only one options.
          </li>
          <li>You can review and change answers before the quiz finish.</li>
          <li>The result will be declared at the end of the quiz.</li>
        </ol>

        {/* <form id="form">
          <input
            ref={inputRef}
            type="text"
            placeholder="Username*"
            className="form-input"
          />
        </form> */}

        <div>
          <Link className="btn" to="/quiz">
            Start Quiz
          </Link>
        </div>
      </div>
    </Wrapper>
  );
};

export default Main;
