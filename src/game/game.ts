import type { Board, Coord, GameType, LastMove, Level } from './types';
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
import { getLevelGoal, score } from './score';

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
    status: 'ACTIVE',
    score: 0,
    board: generateBoard(seed),
    seed: seed,
    level: {
      level: 1,
      score: 0,
      blocks: 0,
      goal: getLevelGoal(1),
    },
    lastMove: null,
  };
};

export const isValidMove = (board: Board, coord: Coord) => {
  const block = board[coord[0]][coord[1]];

  return block !== EMPTY_VALUE && getValidNeighbors(board, coord).length > 0;
};

export const isGameActive = (game: GameType) => {
  return game.status === 'ACTIVE';
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

const updateLevel = (game: GameType, lastMove: LastMove): Level => {
  return {
    ...game.level,
    score: game.level.score + lastMove.score,
    blocks: game.level.blocks + lastMove.blocks,
  };
};

const newLevel = (level: number): Level => {
  return {
    level: level,
    score: 0,
    blocks: 0,
    goal: getLevelGoal(level),
  };
};

const handleEndOfLevel = (game: GameType): GameType => {
  if (game.score >= game.level.goal) {
    // Level up
    return {
      ...game,
      board: generateBoard(game.seed),
      level: newLevel(game.level.level + 1),
      lastMove: null,
    };
  } else {
    // Game over
    return {
      ...game,
      status: 'DONE',
    };
  }
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
      const lastMove = {
        blocks: filled.size,
        score: points,
      };

      return {
        ...game,
        board,
        score: game.score + points,
        level: updateLevel(game, lastMove),
        lastMove,
      };
    }
    case ACTIONS.UPDATE: {
      const gravityBoard = applyGravity(copyBoard(game.board));
      const shiftedBoard = shiftLeft(gravityBoard);

      const updatedGame = {
        ...game,
        board: shiftedBoard,
      };

      if (isOutOfMoves(updatedGame.board)) {
        return handleEndOfLevel(updatedGame);
      }

      return updatedGame;
    }
    default: {
      return game;
    }
  }
};
