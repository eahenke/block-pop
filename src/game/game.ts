import type {
  Board,
  Coord,
  GameType,
  LastMove,
  Level,
  SeedInfo,
  ViewOptions,
} from './types';
import { getRng, type Rng } from './rng';
import { ACTIONS, type Action } from './actions';
import { COLORS, BOARD_SIZE, EMPTY_VALUE, TOTAL_BLOCKS } from './constants';
import {
  applyGravity,
  copyBoard,
  floodFill,
  getValidNeighbors,
  shiftLeft,
} from './matrix';
import { bonusScore, getLevelGoal, score } from './score';
import { getHighScore } from './high-score';

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

type InitGameArgs = {
  seed: string;
  reset: boolean;
  viewOptions?: ViewOptions;
  seedInfo?: SeedInfo | null;
};

export const initGame = ({
  seed,
  reset,
  viewOptions,
  seedInfo,
}: InitGameArgs): GameType => {
  const rng = getRng(seed, reset);

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
      moves: [],
    },
    completedLevels: {},
    lastMove: null,
    rng,
    highScore: seedInfo?.highScore ?? null,
    viewOptions: viewOptions ?? {
      hint: false,
      colorblind: false,
    },
    seedInfo: seedInfo
      ? {
          ...seedInfo,
          attempts: seedInfo.attempts + 1,
          lastPlayed: new Date().toISOString(),
        }
      : {
          seed,
          lastPlayed: new Date().toISOString(),
          attempts: 1,
          highScore: null,
        },
  };
};

const updateSeedInfo = (game: GameType): SeedInfo => {
  const highScoreRecord = getHighScore(game);

  const highScoreValue = highScoreRecord?.score || 0;
  const updatedRecord: SeedInfo =
    game.score <= highScoreValue
      ? game.seedInfo
      : {
          ...game.seedInfo,
          highScore: {
            moves: game.level.moves,
            blocksRemaining: TOTAL_BLOCKS - game.level.blocks,
            attempt: game.seedInfo.attempts,
            score: game.score,
          },
        };

  return updatedRecord;
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
    moves: [...game.level.moves, lastMove.coord],
  };
};

const newLevel = (level: number): Level => {
  return {
    level: level,
    score: 0,
    blocks: 0,
    goal: getLevelGoal(level),
    moves: [],
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
      // TODO: highscore endless handling?
    };
  } else {
    // Game over
    const bonus = bonusScore(TOTAL_BLOCKS - game.level.blocks);
    const updatedLevel: Level = {
      ...game.level,
      score: game.level.score + bonus,
    };
    const updatedGame = {
      ...game,
      score: game.score + bonus,
      level: updatedLevel,
    };

    const seedInfo = updateSeedInfo(updatedGame);

    return {
      ...updatedGame,
      seedInfo,
      status: 'DONE',
    };
  }
};

export const gameReducer = (game: GameType, action: Action): GameType => {
  switch (action.type) {
    case ACTIONS.INIT: {
      return initGame({
        seed: action.payload.seed,
        reset: action.payload.reset || false,
        viewOptions: game.viewOptions,
        seedInfo: action.payload.seedInfo,
      });
    }
    case ACTIONS.RESTART: {
      return initGame({
        seed: game.seed,
        reset: true,
        viewOptions: game.viewOptions,
        seedInfo: game.seedInfo,
      });
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
        coord,
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
    case ACTIONS.SET_VIEW_OPTIONS: {
      return {
        ...game,
        viewOptions: {
          ...game.viewOptions,
          ...action.payload,
        },
      };
    }
    default: {
      return game;
    }
  }
};
