import React from 'react';
import PropTypes from 'prop-types';
const Statistics = ({ scores }) => {
  return (
    <div className='statistics'>
      <h2>Statistics</h2>
      <p>Total games played: <span className='scoreStat'>{scores.humanScore + scores.computerScore}</span> times.</p>
      <p>Human: <span className='scoreStat'>{scores.humanScore}</span> vs Computer: <span className='scoreStat'>{scores.computerScore}</span></p>
    </div>
  );

};
Statistics.propTypes = {
  scores: PropTypes.object,
};
export default Statistics;
