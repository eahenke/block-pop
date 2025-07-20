import { EMPTY_VALUE } from './constants';
import type { Board, Coord } from './types';

export const copyBoard = (board: Board): Board => {
  return board.map(col => [...col]);
};

export const getNeighbors = (coord: Coord): Coord[] => {
  const [col, row] = coord;

  const up = [col, row - 1];
  const right = [col + 1, row];
  const down = [col, row + 1];
  const left = [col - 1, row];

  return [up, right, down, left];
};

export const getValidNeighbors = (board: Board, coord: Coord): Coord[] => {
  const boardWidth = board[0].length;
  const boardHeight = board.length;
  const value = getValue(board, coord);
  const neighbors = getNeighbors(coord).filter(neighborCoord => {
    const [col, row] = neighborCoord;
    const onBoard =
      col >= 0 && col < boardWidth && row >= 0 && row < boardHeight;

    const matching = onBoard && getValue(board, neighborCoord) === value;

    return matching;
  });

  return neighbors;
};

const getValue = (board: Board, coord: Coord): number => {
  const [col, row] = coord;
  return board[col][row];
};

const setValue = (board: Board, coord: Coord, value: number): void => {
  const [row, col] = coord;
  board[row][col] = value;
};

export const floodFill = (board: Board, coord: Coord, newValue: number) => {
  const targetValue = getValue(board, coord);

  let toProcess = [coord, ...getValidNeighbors(board, coord)];
  const filled = new Set<Coord>([]);

  while (toProcess.length) {
    const current = toProcess.shift();

    if (!current || filled.has(current)) {
      continue;
    }

    if (getValue(board, current) !== targetValue) {
      continue;
    }

    toProcess = toProcess.concat(getValidNeighbors(board, current));
    setValue(board, current, newValue);
    filled.add(current);
  }

  return { board, filled };
};

export const applyGravity = (board: Board): Board => {
  return board.map(col => {
    return [...col].sort((a, b) => {
      if (a === EMPTY_VALUE && b !== EMPTY_VALUE) return -1;
      if (a !== EMPTY_VALUE && b === EMPTY_VALUE) return 1;

      return 0;
    });
  });
};

export const shiftLeft = (board: Board): Board => {
  const size = board.length;
  let emptyCount = 0;
  for (let i = size - 1; i >= 0; i--) {
    const col = board[i];
    const isEmpty = col.every(val => val === EMPTY_VALUE);
    if (isEmpty) {
      board.splice(i, 1);
      emptyCount++;
    }
  }

  for (let i = 0; i < emptyCount; i++) {
    board.push(new Array(size).fill(EMPTY_VALUE));
  }

  return board;
};
