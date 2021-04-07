import heuristicScore from './estimateScore';
import { listOfMoves }  from './listOfMoves';
import calculateWinner from './calculateWinner';
function findNextMove (squares, xIsNext) {
  // Given the board squares and who is going to play next, we look for the next move
  const Moves = listOfMoves(squares);
  const depth = 2;
  const alpha = - (10**9);
  const beta = 10**9;
  let count = 0;
  const maxCount = 3000;
  // each time we test a new move, we increase count by 1. If count >= maxCount, we stop and take
  // the best move possible
  const nextMove = function (depth, alpha, beta, squares, xIsNext) {
    // Given the squares, xIsNext is true/false, this function returns the next move,
    // with coordinates move.x, move.y and the point of the move: move.point.
    // console.log('the value of depth is', depth);
    const gameTermination = calculateWinner(squares);
    if (gameTermination !== null) {
      let x, y;
      for (let node = 0; node < Moves.length; node++) {
        let i = Moves[node][0];
        let j = Moves[node][1];
        if (squares[i][j] === null) {
          x = i;
          y = j;
          break;
        }
      }
      if (squares[gameTermination[0][0]][gameTermination[0][1]] === 'X') {
        return { point: (10**9), x, y, pointX: 10**9, pointO: 0  };
      } else {
        return { point: -(10**9),x, y, pointX: 0, pointO: - (10**9) };
      }
    }

    if (depth === 0) {
      return { ...heuristicScore(squares, xIsNext) };
    }

    if (xIsNext) {
      let point = - (2*10**9);
      let x,y, pointX, pointO;
      let newSquares = squares.map(arr => arr.slice());
      for (let node = 0; node < Moves.length; node++) {
        let i = Moves[node][0];
        let j = Moves[node][1];
        if (squares[i][j] === null) {
          count += 1;
          if (count > maxCount) {
            break;
          }
          newSquares[i][j] = 'X';
          let afterX = nextMove(depth - 1, alpha, beta, newSquares, false);
          newSquares[i][j] = null;
          if (point < afterX.point) {
            point = afterX.point;
            pointX = afterX.pointX;
            pointO = afterX.pointO;
            x = i;
            y = j;
          }
          if (alpha < point) {
            alpha = point;
          }
          if (alpha >= beta) {
            break;
          }
        }
      }
      return { point, x, y, pointX, pointO };
    } else {
      let point = (2*10**9), pointX, pointO;
      let x,y;
      let newSquares = squares.map(arr => arr.slice());
      for (let node = 0; node < Moves.length; node++) {
        let i = Moves[node][0];
        let j = Moves[node][1];
        if (squares[i][j] === null) {
          count += 1;
          if (count > maxCount) {
            break;
          }
          newSquares[i][j] = 'O';
          let afterO = nextMove(depth - 1, alpha, beta, newSquares, true);
          newSquares[i][j] = null;
          if (point > afterO.point) {
            point = afterO.point;
            pointX = afterO.pointX;
            pointO = afterO.pointO;
            x = i;
            y = j;
          }
          if (beta > point) {
            beta = point;
          }
          if (beta <= alpha) {
            break;
          }
        }
      }

      return { point, x , y, pointX, pointO };
    }
  };

  return nextMove(depth, alpha, beta, squares, xIsNext);
}
export default findNextMove;
