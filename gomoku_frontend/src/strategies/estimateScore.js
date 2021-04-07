import waysToWin from './waysToWin';
import { xState, xScore, oState, oScore } from './lineScores';
export default function heuristicScore (squares, xIsNext) {
  // this function estimates the score of any board, given who is going to play next
  // it scans all possible types of line of 5, each one is given a score, and sums up all the scores
  let size = squares.length;
  let ways = waysToWin(size);
  let point = 0, pointX = 0, pointO = 0 ; //the number of points of the board, given who is going to play next
  for (let s = 0; s < ways.length; s++) {
    let way = { ...ways[s] };
    for (let i = way.startI; i < way.endI; i++)
      for (let j = way.startJ; j < way.endJ; j++)
        for (let k = 0; k < xState.length; k++) {
          let line = way.stretch.map(cord => [cord[0] + i, cord[1] + j]).map(cord => squares[cord[0]][cord[1]]);
          if (xState[k][0] === line[0] && xState[k][1] === line[1] && xState[k][2] === line[2]) {
            if (xState[k][3] === line[3] && xState[k][4] === line[4]) {
              if (xIsNext) {
                point += xScore[k][0];
                pointX += xScore[k][0];
              } else {
                point += xScore[k][1];
                pointX += xScore[k][1];
              }
              break;
            }
          }
        }
    for (let i = way.startI; i < way.endI; i++)
      for (let j = way.startJ; j < way.endJ; j++)
        for (let k = 0; k < oState.length; k++) {
          let line = way.stretch.map(cord => [cord[0] + i, cord[1] + j]).map(cord => squares[cord[0]][cord[1]]);
          if (oState[k][0] === line[0] && oState[k][1] === line[1] && oState[k][2] === line[2]) {
            if (oState[k][3] === line[3] && oState[k][4] === line[4]) {
              if (xIsNext) {
                point += oScore[k][1];
                pointO += oScore[k][1];
              } else {
                point += oScore[k][0];
                pointO += oScore[k][0];
              }
              break;
            }
          }
        }
  }

  return { point, pointX, pointO };
}