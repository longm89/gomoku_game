import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import React from 'react';
import './index.css';
import calculateWinner  from './strategies/calculateWinner';
import findNextMove  from './strategies/findNextMove';
import Welcome from './components/Welcome';
import Score from './components/Score';
import Board from './components/Board';
import Status from './components/Status';
import Footer from './components/Footer';
import scoreService from './scoreServices';
export const size = 15;
const Game = () => {
  const [humanStarts, setHumanStarts] = useState(true); // whether human will start the game
  const [squares, setSquares] = useState(new Array(size).fill().map(() => new Array(size).fill(null)));
  const [humanIsNext, setHumanIsNext] = useState(humanStarts); // inside a game, whether human is going to play
  const [lastMove, setLastMove] = useState(null);
  const [computerScore, setComputerScore] = useState(0); // current computer score
  const [humanScore, setHumanScore] = useState(0);   // current human score
  const [totalScores, setTotalScores] = useState({ humanScore: 0, computerScore: 0 });
  // total scores from all people who played the game

  useEffect(() => {
    scoreService.getAll() // get the current scores from the database
      .then(scores => {setTotalScores(scores); console.log('The scores is ', scores);});
  }, []);

  // The function findNextMove contains a heavy calculation, to calculate the next more for the
  // computer
  useEffect(() => {
    if (calculateWinner(squares) === null && !humanIsNext) {
      // if the game is not yet determined and if the computer is going to play next
      let newSquares = squares.map(arr => arr.slice());
      const next = findNextMove(newSquares, humanIsNext);
      newSquares[next.x][next.y] = 'O';
      setSquares(newSquares);
      setLastMove([next.x, next.y]);
      setHumanIsNext(true);
      if (calculateWinner(newSquares) !== null) {
        setComputerScore(computerScore + 1);
        scoreService.addComputerScore()
          .then(newTotalScores => {setTotalScores(newTotalScores);});
      }
    }
  }, [humanIsNext, humanStarts]);

  const handleClick = (row,col) => {
    if (squares[row][col] || calculateWinner(squares) !== null || !humanIsNext) {
      return;
    }
    let newSquares = squares.map(arr => arr.slice());
    newSquares[row][col] = 'X';
    setSquares(newSquares);
    setLastMove([row, col]);
    setHumanIsNext(false);
    if (calculateWinner(newSquares) !== null) {
      setHumanScore(humanScore + 1);
      scoreService.addHumanScore()
        .then(newTotalScores => {setTotalScores(newTotalScores);});
    }
  };

  const reStart = () => {
    setSquares(new Array(size).fill().map(() => new Array(size).fill(null)));
    let whoWillStart = ! humanStarts;
    setHumanStarts(whoWillStart);
    setHumanIsNext(whoWillStart);
    setLastMove(null);
  };
  const restartButtonStyle = lastMove === null ? { display: 'none' } : { display: 'initial' };
  return (
    <div className="total_game">
      <Welcome/>
      <div className="board_and_info">
        <Board
          squares={squares}
          lastMove={lastMove}
          handleClick={handleClick}
        />

        <div className="info">
          <div className="status">
            <Status squares={squares} xIsNext={humanIsNext}/>
          </div>

          <div className="score">
            <Score humanScore={humanScore} computerScore={computerScore}/>
          </div>

          <button onClick={reStart}
            style={restartButtonStyle}
          >
            {calculateWinner(squares) === null ? 'Restart the game ? ':'Another game ?'}
          </button>
          <Footer scores={totalScores}/>
        </div>

      </div>

    </div>
  );

};

ReactDOM.render(
  <Game/>,
  document.getElementById('root')
);

