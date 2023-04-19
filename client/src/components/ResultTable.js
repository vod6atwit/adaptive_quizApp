import React from 'react';
import Wrapper from '../assets/wrapper/ResultTable';

const ResultTable = ({ name, attempts, earnPoints, result }) => {
  return (
    <Wrapper>
      <table>
        <thead className="table-header">
          <tr className="table-row">
            <td>Name</td>
            <td>Attemps</td>
            <td>Earn Points</td>
            <td>Result</td>
          </tr>
        </thead>
        <tbody>
          <tr className="table-body">
            <td>{name}</td>
            <td>{attempts}</td>
            <td>{earnPoints}</td>
            <td>{result}</td>
          </tr>
        </tbody>
      </table>
    </Wrapper>
  );
};

export default ResultTable;
