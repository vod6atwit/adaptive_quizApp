import React from 'react';
import Wrapper from '../assets/wrapper/Result';
import { Link } from 'react-router-dom';
import ResultTable from './ResultTable';
import { useAppContext } from '../context/appContext';
import { useEffect } from 'react';
import { attemptsNumber, earnPointsNumber, flagResult } from '../helper';

const Result = () => {
  const { queue, answers, result, userId, reStartExamAction } = useAppContext();

  const point = 10;
  const totalPoints = queue.length * point;
  const attempts = attemptsNumber(result);
  const earnPoints = earnPointsNumber({ result, answers, point });
  const flag = flagResult({ totalPoints, earnPoints });

  // useEffect(() => {
  //   console.log(result);
  //   console.log(totalPoints);
  //   console.log(attempts);
  //   console.log(earnPoints);
  //   console.log(flag);
  // });

  const onRestart = () => {
    reStartExamAction();
  };

  return (
    <Wrapper>
      <div className="container">
        <h1 className="title">Quiz Application</h1>

        <div className="result flex-center">
          <div className="flex">
            <span>Username :</span>
            <span className="bold">Duy Vo</span>
          </div>
          <div className="flex">
            <span>Total Quiz Points : </span>
            <span className="bold">{totalPoints}</span>
          </div>
          <div className="flex">
            <span>Total Questions : </span>
            <span className="bold">{queue.length}</span>
          </div>
          <div className="flex">
            <span>Total Attemps : </span>
            <span className="bold">{attempts}</span>
          </div>
          <div className="flex">
            <span>Total Earn Points : </span>
            <span className="bold">{earnPoints}</span>
          </div>
          <div className="flex">
            <span>Quiz Result : </span>
            <span
              style={{
                color: `${flag ? 'var(--green-dark)' : 'var(--red-dark)'}`,
                background: `${
                  flag ? 'var(--green-light)' : 'var(--red-light)'
                }`,
                padding: '1px 15px',
              }}
              className="bold"
            >
              {flag ? 'Passed' : 'Failed'}
            </span>
          </div>
        </div>

        <div className="start">
          <Link className="btn" to="/" onClick={onRestart}>
            Restart
          </Link>
        </div>

        <div>
          <ResultTable
            attempts={attempts}
            earnPoints={earnPoints}
            result={flag ? 'Passed' : 'Failed'}
          />
        </div>
      </div>
    </Wrapper>
  );
};

export default Result;
