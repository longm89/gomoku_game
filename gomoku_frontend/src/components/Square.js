import React from 'react';
import PropTypes from 'prop-types';
const Square = (props) => {
  return (
    <button
      className={`square 
                ${props.isLastMove ? 'hightLight' : 'normal'} 
                ${props.isWinning ? 'winning animate__animated animate__tada animate__repeat-3' : ''}`}
      style={props.lastSymbol === 'O' ? { cursor: 'default' } : { cursor: 'wait' }}
      onClick={() => props.onClick()}
    >
      {props.value}
    </button>
  );
};
Square.propTypes = {
  isLastMove: PropTypes.bool,
  isWinning: PropTypes.bool,
  onClick: PropTypes.func,
  value: PropTypes.string,
  lastSymbol: PropTypes.string
};
export default Square;