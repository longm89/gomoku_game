import calculateWinner from '../strategies/calculateWinner';
import Square from './Square';
import React from 'react';
import PropTypes from 'prop-types';
const Board = ({ squares, lastMove, handleClick }) => {
  const renderSquare = (row,col) => {
    return <Square key={col.toString()}
      value={squares[row][col]}
      onClick={() => handleClick(row, col)}
      lastSymbol={lastMove ? squares[lastMove[0]][lastMove[1]] : 'O'}
      //highlight the last move
      isLastMove={lastMove && (lastMove[0] === row) && (lastMove[1] === col)}
      isWinning={calculateWinner(squares)
        && calculateWinner(squares).filter(cord => (cord[0]=== row && cord[1] === col)).length > 0}
    />;
  };

  return (
    <div>
      {squares.map((row, rowIndex) =>
        <div className="boardRow" key={rowIndex.toString()}>
          {row.map((column, columnIndex) => renderSquare(rowIndex, columnIndex))}
        </div>
      )}
    </div>
  );
};

Board.propTypes = {
  squares:PropTypes.array,
  handleClick: PropTypes.func,
  lastMove:PropTypes.array
};

export default Board;