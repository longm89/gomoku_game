import React from 'react';
import PropTypes from 'prop-types';
const Footer = ({ scores }) => {
  return (
    <div className='footer'>
      <p>The game has been played <span className='scoreStat'>{scores.humanScore + scores.computerScore}</span> times.</p>
      <p>Human: <span className='scoreStat'>{scores.humanScore}</span> vs Computer: <span className='scoreStat'>{scores.computerScore}</span></p>
    </div>
  );

};
Footer.propTypes = {
  scores: PropTypes.object,
};
export default Footer;
