import React from 'react';
import Wrapper from '../assets/wrapper/Result';
import { Link } from 'react-router-dom';
import ResultTable from './ResultTable';
import { useAppContext } from '../context/appContext';

const Result = () => {
  const { reStartExamAction } = useAppContext();

  const onRestart = () => {
    reStartExamAction();
  };

  return (
    <Wrapper>
      <div className="container">
        <h1 className="title">Quiz Application</h1>

        <div className="result flex-center">
          <div className="flex">
            <span>Username</span>
            <span className="bold">Duy Vo</span>
          </div>
          <div className="flex">
            <span>Total Quiz Points : </span>
            <span className="bold">50</span>
          </div>
          <div className="flex">
            <span>Total Questions : </span>
            <span className="bold">05</span>
          </div>
          <div className="flex">
            <span>Total Attemps : </span>
            <span className="bold">03</span>
          </div>
          <div className="flex">
            <span>Total Earn Points : </span>
            <span className="bold">30</span>
          </div>
          <div className="flex">
            <span>Quiz Result : </span>
            <span className="bold">Passed</span>
          </div>
        </div>

        <div className="start">
          <Link className="btn" to="/" onClick={onRestart}>
            Restart
          </Link>
        </div>

        <div>
          <ResultTable />
        </div>
      </div>
    </Wrapper>
  );
};

export default Result;
