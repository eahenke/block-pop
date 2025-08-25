import type { GameType } from './types';

export const getHighScore = (game: GameType) => {
  return game.highScore;
};
