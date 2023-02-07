import React, { useState } from 'react';
import Wrapper from '../assets/wrapper/Question';
import data from '../database/data';

const Question = () => {
  const [checked, setChecked] = useState(undefined);

  const question = data[0];

  const onClick = e => {
    // setChecked(!checked);
    console.log(e.target);
  };
  return (
    <Wrapper>
      <div className="questions">
        <h2 className="text-light">{question.question}</h2>

        <ul key={question.id}>
          {question.options.map((q, i) => (
            <li key={i} className="options">
              <input
                type="radio"
                id={`q${i}-option`}
                name="options"
                value={false}
                onClick={onClick}
              />
              <label className="text" htmlFor={`q${i}-option`}>
                {q}
              </label>
            </li>
          ))}
        </ul>
      </div>
    </Wrapper>
  );
};

export default Question;
