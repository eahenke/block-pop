import type { Board } from './types';
import { getRng } from './rng';
import { ACTIONS, type Action } from './actions';
import { COLORS, BOARD_SIZE } from './constants';

/**
 * Game functions needed
 *
 * generate board
 * remove piece (with animation?)
 * shift pieces down (after timeout?)
 * shift pieces over if column empty
 * Add pieces?
 *
 * Needs a singleton prng from seed
 *
 */

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
  };
};

export type GameType = {
  score: number;
  board: Board;
  seed: string;
  level: number;
};

export const gameReducer = (game: GameType, action: Action): GameType => {
  switch (action.type) {
    case ACTIONS.INIT: {
      return initGame(action.payload.seed);
    }
    default: {
      return game;
    }
  }
};
