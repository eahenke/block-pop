import { EMPTY_VALUE } from './constants';
import type { Board, Coord } from './types';

export const copyBoard = (board: Board): Board => {
  return board.map(row => [...row]);
};

export const getNeighbors = (coord: Coord): Coord[] => {
  const [row, col] = coord;

  const up = [row - 1, col];
  const right = [row, col + 1];
  const down = [row + 1, col];
  const left = [row, col - 1];

  return [up, right, down, left];
};

export const getValidNeighbors = (board: Board, coord: Coord): Coord[] => {
  const boardWidth = board[0].length;
  const boardHeight = board.length;
  const value = getValue(board, coord);
  const neighbors = getNeighbors(coord).filter(neighborCoord => {
    const [row, col] = neighborCoord;
    const onBoard =
      row >= 0 && row < boardWidth && col >= 0 && col < boardHeight;

    const matching = onBoard && getValue(board, neighborCoord) === value;

    return matching;
  });

  return neighbors;
};

export const getValue = (board: Board, coord: Coord): number => {
  const [row, col] = coord;
  return board[row][col];
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
