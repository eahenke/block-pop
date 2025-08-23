import type { Rng } from './rng';

export type Board = number[][];

export type Coord = number[];

export type Level = {
  level: number;
  score: number;
  blocks: number;
  goal: number;
  moves: Coord[];
};

export type LastMove = {
  blocks: number;
  score: number;
  coord: Coord;
};

export type HighScore = {
  score: number;
  moves: HighScoreMoves;
};

export type HighScoreLevels = Record<number, HighScore | number>;

export type HighScores = Record<string, HighScoreLevels>;

export type HighScoreMoves = Coord[];

export type ViewOptions = {
  colorblind: boolean;
  hint: boolean;
};

export type GameType = {
  mode: 'SINGLE' | 'ENDLESS';
  status: 'ACTIVE' | 'DONE';
  score: number;
  board: Board;
  seed: string;
  level: Level;
  completedLevels: Record<number, Level>;
  lastMove: LastMove | null;
  rng: Rng;
  highScores: HighScoreLevels;
  highScore: number;
  viewOptions: ViewOptions;
};
