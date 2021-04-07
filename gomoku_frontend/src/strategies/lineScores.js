// We will estimate the score of a board, given whether the next move will be played by X or O
// To do that, we look at each line of 5 and give a certain score for each of them.
// We could then scan the board for all lines of 5 and give a total score.
// This file contains the state of the line and its corresponding score
const xState = [
  // 1st kind of lines
  ['X','X','X','X','X'],
  [null,'X','X','X','X'],
  ['X','X','X','X',null],
  ['X','X','X',null,'X'],
  ['X',null,'X','X','X'],
  ['X','X',null,'X','X'],
  // 2nd kind of lines
  [null,'X','X','X',null],
  ['X','X','X',null,null],
  [null,null,'X','X','X'],
  [null,'X',null,'X','X'],
  ['X',null,'X',null,'X'],
  ['X','X',null,'X',null],
  [null,'X','X',null,'X'],
  ['X',null,'X','X',null],
  // 3rd kinds of lines
  [null,'X',null,'X',null],
  [null,'X','X',null,null],
  [null,null,'X','X',null],
];
// the first column of xScore is the score when X is going to be played next and the second is when O is played next
const xScore = [
  [10**8, 10**8],
  [10**8, 10**7],
  [10**8, 10**7],
  [10**8, 10**7],
  [10**8, 10**7],
  [10**8, 10**7],

  [10**6, 10**5],
  [10**5, 10**4],
  [10**5, 10**4],
  [10**5, 10**4],
  [10**5, 10**4],
  [10**5, 10**4],
  [10**5, 10**4],
  [10**5, 10**4],

  [10**2, 10],
  [10**2, 10],
  [10**2, 10],
];

let oState = xState.map(row => row.slice());
for (let i = 0; i < xState.length; i++)
  for (let j =0; j < xState[i].length; j++)
    if (oState[i][j] === 'X') {
      oState[i][j] = 'O';
    }
// the first column of oScore is the score when O is going to be played next and the second is when X is played next
let oScore = xScore.map(row => row.slice());
for (let i = 0; i < oScore.length; i++){
  oScore[i][0] = - xScore[i][0];
  oScore[i][1] = - xScore[i][1];
}

export { xState, xScore, oState, oScore };