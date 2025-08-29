import { SCORE_INCREMENT } from './constants';

export const score = (blocks: number) => {
  return blocks * blocks * SCORE_INCREMENT;
};

export const bonusScore = (blocksRemaining: number) => {
  if (blocksRemaining >= 10) return 0;

  return 2000 - blocksRemaining * blocksRemaining * 20;
};

export const getLevelGoal = (level: number) => {
  if (level === 1) return 1000;
  if (level === 2) return 2500;
  if (level === 3) return 4500;

  return 4500 + (level - 3) * 2000;
};
