import waysToWin from './waysToWin';
export default function calculateWinner(squares) {
  // This function returns the line of winning if there's one, otherwise, it returns null
  // We scan the squares to find all possible lines of 5 that can lead to a winning
  let size = squares.length;
  let ways = waysToWin(size);
  for (let s = 0; s < ways.length; s++) {
    let way = ways[s];
    for (let i = way.startI; i < way.endI; i++)
      for (let j = way.startJ; j < way.endJ; j++) {
        let line = way.stretch.map(cord => [cord[0] + i, cord[1] + j]).map(cord => squares[cord[0]][cord[1]]);
        if (line[0] !== null && line[0] === line[1] && line[1] === line[2] && line[2] === line[3] && line[3] === line[4]) {
          return way.stretch.map(cord => [cord[0] + i, cord[1] + j]);
        }
      }
  }
  return null;
}