import type { Board, Coord } from './types';
import { getRng } from './rng';
import { ACTIONS, type Action } from './actions';
import { COLORS, BOARD_SIZE, EMPTY_VALUE } from './constants';
import {
  applyGravity,
  copyBoard,
  floodFill,
  getValidNeighbors,
  shiftLeft,
} from './matrix';
import { score } from './score';

const generateTileValue = (seed: string) => {
  return Math.floor(getRng(seed).random() * COLORS + 1);
};

const generateBoard = (seed: string) => {
  const board: Board = [];
  for (let i = 0; i < BOARD_SIZE; i++) {
    board[i] = [];
    for (let j = 0; j < BOARD_SIZE; j++) {
      board[i][j] = generateTileValue(seed);
    }
  }

  return board;
};

export const initGame = (seed: string): GameType => {
  return {
    score: 0,
    board: generateBoard(seed),
    seed: seed,
    level: 1,
    lastMove: null,
  };
};

export const isValidMove = (board: Board, coord: Coord) => {
  const block = board[coord[0]][coord[1]];

  return block !== EMPTY_VALUE && getValidNeighbors(board, coord).length > 0;
};

const isOutOfMoves = (board: Board): boolean => {
  return board.every((col, cIdx) => {
    return col.every((block, rIdx) => {
      return (
        block === EMPTY_VALUE || !getValidNeighbors(board, [cIdx, rIdx]).length
      );
    });
  });
};

export type GameType = {
  score: number;
  board: Board;
  seed: string;
  level: number;
  lastMove: {
    blocks: number;
    score: number;
  } | null;
};

export const gameReducer = (game: GameType, action: Action): GameType => {
  switch (action.type) {
    case ACTIONS.INIT: {
      return initGame(action.payload.seed);
    }
    case ACTIONS.REMOVE: {
      const { col, row } = action.payload;
      const coord = [col, row];

      if (!isValidMove(game.board, coord)) {
        return game;
      }

      const { board, filled } = floodFill(
        copyBoard(game.board),
        coord,
        EMPTY_VALUE
      );

      const points = score(filled.size);

      return {
        ...game,
        board,
        score: game.score + points,
        lastMove: {
          blocks: filled.size,
          score: points,
        },
      };
    }
    case ACTIONS.UPDATE: {
      const gravityBoard = applyGravity(copyBoard(game.board));
      const shiftedBoard = shiftLeft(gravityBoard);

      if (isOutOfMoves(shiftedBoard)) {
        // TODO: Handle game over or level up
      }

      return {
        ...game,
        board: shiftedBoard,
      };
    }
    default: {
      return game;
    }
  }
};
