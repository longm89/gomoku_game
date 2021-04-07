
//there are 4 kinds of lines to win the game
//Given the size of the board, we will check for 4 kinds of lines with
// the starting point [row, column] with row in [startI, endI], column in [startJ, endJ]
const waysToWin = (size) => [
  { stretch: [[0, 0], [0, 1], [0, 2], [0, 3], [0, 4]],
    startI: 0, endI: size, startJ: 0, endJ: size - 4 },
  { stretch: [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0]],
    startI: 0, endI: size - 4, startJ: 0, endJ: size },
  { stretch: [[0, 0], [1, 1], [2, 2], [3, 3], [4, 4]],
    startI: 0, endI: size - 4, startJ: 0, endJ: size - 4 },
  { stretch: [[4, 0], [3, 1], [2, 2], [1, 3], [0, 4]],
    startI: 0, endI: size - 4, startJ: 0, endJ: size - 4 },
];

export default waysToWin;