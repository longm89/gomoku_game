// generate a possible list of moves, from the ones that are closest to the squares that have been played to other squares of the outside.
// We only choose maxNumberOfMoves=60 at most so that the program can run quickly
// We choose also the moves that have a distance of <=2 from a move that has been played
const listOfMoves = (squares) => {
  let list = []; // return a list of possible moves, with maximum maxNumberOfMoves if there are more
  const size = squares.length;
  const maxNumberOfMoves = 60;
  let minDist = new Array(size).fill().map(() => Array(size).fill(1000000));
  for (let i = 0; i < size; i ++)
    for (let j = 0; j < size; j++) {
      for (let g = 0; g < size; g++)
        for (let h = 0; h <size; h++)
          if (squares[g][h] !== null)
            if (minDist[i][j] > Dist([i,j], [g,h])) {
              minDist[i][j] = Dist([i,j],[g,h]);
            }
    }
  for (let i = 0; i < size; i ++)
    for (let j = 0; j < size; j++) {
      if (minDist[i][j] > 0.0001 && minDist[i][j] < 4) {
        list.push([i,j,minDist[i][j]]);
      }
    }
  list.sort((a,b) => {
    if (minDist[b[0]][b[1]] > minDist[a[0]][a[1]]) {
      return -1;
    }
    if (minDist[b[0]][b[1]] < minDist[a[0]][a[1]]) {
      return 1;
    }
    return 0;
  });

  if (list.length > maxNumberOfMoves) {
    list = list.slice(0, maxNumberOfMoves);
  }
  list = list.filter(cord => cord[2] <= 2);
  if (list.length === 0) {
    list.push([Math.floor(size/2), Math.floor(size/2)]);
  }
  return list;
};

function Dist(a,b) {
  return ((a[0]-b[0])**2 + (a[1] - b[1])**2)**0.5;
}

export { listOfMoves, Dist };
