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

export type ViewOptions = {
  colorblind?: boolean;
  hint?: boolean;
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
  highScore: HighScore | null;
  viewOptions: ViewOptions;
  seedInfo: SeedInfo;
};

export type HighScore = {
  attempt: number;
  score: number;
  moves: Coord[];
  blocksRemaining: number;
  date: string; // ISO Date
};

export type Attempt = {
  number: number;
  score: number;
  date: string; // ISO Date
  blocksRemaining: number;
};

export type SeedInfo = {
  seed: string;
  attempts: number;
  lastPlayed: string; // ISO date
  highScore: HighScore;
  history: Attempt[];
};

export type SeedHistory = Record<string, SeedInfo>;
