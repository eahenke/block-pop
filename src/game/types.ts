import type { Rng } from './rng';

export type Board = number[][];

export type Coord = number[];

export type Level = {
  level: number;
  score: number;
  blocks: number;
  goal: number;
};

export type LastMove = {
  blocks: number;
  score: number;
};

export type HighScore = Record<number, number>;

export type HighScores = Record<string, HighScore>;

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
  highScores: HighScore;
  highScore: number;
};
