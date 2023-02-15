import React, { useEffect, useState } from 'react';
import Wrapper from '../assets/wrapper/Question';
import data from '../database/data';
import { useAppContext } from '../context/appContext';
import Loading from './Loading';

const Question = ({ onChecked }) => {
  const { isLoading, queue, trace, startExamAction, setCheckedAnswer, result } =
    useAppContext();

  useEffect(() => {
    startExamAction();
  }, []);

  if (isLoading) {
    return <Loading center={true} />;
  }

  const onSelect = index => {
    setCheckedAnswer();
    // for store the user options selected to the result array
    onChecked(index);
  };

  return (
    <Wrapper>
      <div className="questions">
        <h2 className="text-light">{queue[trace]?.question}</h2>

        <ul key={queue[trace]?.id}>
          {queue[trace]?.options.map((ans, index) => (
            <li
              key={index}
              className={`options ${result[trace] === index ? 'checked' : ''}`}
            >
              <input
                type="radio"
                value={false}
                name="options"
                id={`q${index}-option`}
                onChange={() => onSelect(index)}
              />
              <label className="text" htmlFor={`q${index}-option`}>
                {ans}
              </label>
            </li>
          ))}
        </ul>
      </div>
    </Wrapper>
  );
};

export default Question;
