import React from 'react';
// import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { FormRowSelect } from '../components';
import Wrapper from '../assets/wrapper/Main';
import { useAppContext } from '../context/appContext';

const Main = () => {
  const { handleChange, topicOptions } = useAppContext();

  const handleSearch = e => {
    const name = e.target.name;
    const value = e.target.value;

    // if (isLoading) return;

    handleChange({ name, value });
  };

  return (
    <Wrapper>
      <div className="container">
        <h1 className="title text-light">Read before you start the quiz</h1>

        <ol>
          <li>
            You will be asked questions one after another and based on the
            topic.
          </li>
          <li>10 points is awared for the correct answer.</li>
          <li>
            Each question has multiple options. You can choose only one options.
          </li>
          <li>You can review and change answers before the quiz finish.</li>
          <li>The result will be declared at the end of the quiz.</li>
        </ol>

        <form id="form">
          <FormRowSelect
            labelText="Choose Topic"
            // exact name in global state
            name="topic"
            // value={topic}
            handleChange={handleSearch}
            list={topicOptions}
          />
        </form>

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
