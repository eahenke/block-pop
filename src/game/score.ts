import { SCORE_INCREMENT } from './constants';

export const score = (blocks: number) => {
  return blocks * blocks * SCORE_INCREMENT;
};
