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

export type GameType = {
  status: 'ACTIVE' | 'DONE';
  score: number;
  board: Board;
  seed: string;
  level: Level;
  lastMove: LastMove | null;
};
