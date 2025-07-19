const DEFAULT_BOARD_SIZE = 10;
const EMPTY_VALUE = 0;

type Board = number[][];

type BoardOptions = {
  size: number;
};

export const generateBoard = ({ size = DEFAULT_BOARD_SIZE }: BoardOptions) => {
  const board: Board = [];
  for (let i = 0; i < size; i++) {
    board[i] = [];
    for (let j = 0; j < size; j++) {
      board[i][j] = EMPTY_VALUE;
    }
  }

  return board;
};
