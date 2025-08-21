import type { Board, Coord, GameType, LastMove, Level } from './types';
import { getRng, type Rng } from './rng';
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
import { getHighScoreForSeed } from './high-score';

const generateTileValue = (rng: Rng) => {
  return Math.floor(rng.random() * COLORS + 1);
};

const generateBoard = (rng: Rng) => {
  const board: Board = [];
  for (let i = 0; i < BOARD_SIZE; i++) {
    board[i] = [];
    for (let j = 0; j < BOARD_SIZE; j++) {
      board[i][j] = generateTileValue(rng);
    }
  }

  return board;
};

export const initGame = (seed: string, reset = false): GameType => {
  const rng = getRng(seed, reset);
  const highScores = getHighScoreForSeed(seed) || {};

  return {
    // TODO: enable endless mode
    mode: 'SINGLE',
    status: 'ACTIVE',
    score: 0,
    board: generateBoard(rng),
    seed: seed,
    level: {
      level: 1,
      score: 0,
      blocks: 0,
      goal: getLevelGoal(1),
    },
    completedLevels: {},
    lastMove: null,
    rng,
    highScore: highScores?.[1] || 0,
    highScores,
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
  if (game.mode === 'ENDLESS' && game.score >= game.level.goal) {
    const nextLevel = game.level.level + 1;
    // Level up
    return {
      ...game,
      board: generateBoard(game.rng),
      level: newLevel(nextLevel),
      lastMove: null,
      completedLevels: {
        ...game.completedLevels,
        [game.level.level]: game.level,
      },
      highScore: game.highScores[nextLevel] || 0,
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
      return initGame(action.payload.seed, action.payload.reset);
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
