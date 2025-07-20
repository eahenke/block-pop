export type Board = number[][];

export type Coord = number[];

export type Level = {
  level: number;
  score: number;
  blocks: number;
  goal: number;
};

export type GameType = {
  score: number;
  board: Board;
  seed: string;
  level: Level;
  lastMove: {
    blocks: number;
    score: number;
  } | null;
};
