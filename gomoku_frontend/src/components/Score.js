import React from 'react';
import PropTypes from 'prop-types';
const Score = (props) =>
  <div>
    <h2>Scores</h2>
    <div className = "scoreRow">
      <div className = "humanScore">
        <h3>Human</h3>
        <p>{props.humanScore}</p>
      </div>
      <div className = "computerScore">
        <h3>Computer</h3>
        <p>{props.computerScore}</p>
      </div>
    </div>
  </div>;
Score.propTypes = {
  humanScore: PropTypes.number,
  computerScore: PropTypes.number,
};
export default Score;