import { isComplexHighScore } from './high-score';
import type { Coord, GameType } from './types';

export const isSameCoord = (a: Coord, b: Coord) => {
  return a[0] === b[0] && a[1] === b[1];
};

const isOnHsTrack = (currentMoves: Coord[], hsMoves: Coord[]) => {
  return currentMoves.every((coord, idx) => {
    return isSameCoord(coord, hsMoves[idx]);
  });
};

export const getNextMove = (game: GameType) => {
  const highScore = game.highScores?.[game.level.level];

  if (!highScore || !isComplexHighScore(highScore)) {
    return null;
  }

  const hsMoves = highScore.moves || [];
  const currentMoves = game.level?.moves || [];
  if (currentMoves.length === 0) {
    return hsMoves[0] || null;
  }

  if (isOnHsTrack(currentMoves, hsMoves)) {
    return hsMoves[currentMoves.length];
  }

  return null;
};
