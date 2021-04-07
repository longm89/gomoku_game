import calculateWinner from '../strategies/calculateWinner';
import PropTypes from 'prop-types';
import React from 'react';
const Status = (props) => {
  const winnerLine = calculateWinner(props.squares);
  return (
    <div className = 'status'>
      {winnerLine !== null ?
        props.squares[winnerLine[0][0]][winnerLine[0][1]] === 'X' ?
          <div>
            <h2>Winner</h2>
            <p className = 'animate__animated animate__flash animate__repeat-3'>Human! </p>
          </div> :
          <div>
            <h2>Winner</h2>
            <p className = 'animate__animated animate__flash animate__repeat-3'>Computer!!</p>
          </div>
        : props.xIsNext ?
          <div>
            <h2>Next player</h2>
            <p>Human (X): Click on a square to play</p>
          </div> :
          <div>
            <h2>Next player</h2>
            <p>Computer (O): Thinking...</p>
          </div>
      }
    </div>
  );
};
Status.propTypes = {
  squares:PropTypes.array,
  handleClick: PropTypes.func,
  lastMove:PropTypes.array,
  xIsNext:PropTypes.bool
};
export default Status;