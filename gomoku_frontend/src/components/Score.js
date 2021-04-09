import React from 'react';
import PropTypes from 'prop-types';
const Score = (props) =>
  <div className="score">
    <h2>Scores</h2>
    <div className = "scoreRow">
      <div className = "humanScore">
        <h3>Human</h3>
        {props.humanScore}
      </div>
      <div className = "computerScore">
        <h3>Computer</h3>
        {props.computerScore}
      </div>
    </div>
  </div>;
Score.propTypes = {
  humanScore: PropTypes.number,
  computerScore: PropTypes.number,
};
export default Score;