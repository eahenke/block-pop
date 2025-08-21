import { useEffect } from 'react';
import { useGame } from './use-game';
import { saveHighScore } from '../../game/high-score';

export const useHighScore = () => {
  const { game } = useGame();
  const { level, seed, status } = game;

  useEffect(() => {
    if (level.level === 1) {
      return;
    }

    const completedLevel = game.completedLevels[level.level - 1];
    if (!completedLevel) {
      console.error('No completed level found for', level.level - 1);
      return;
    }

    saveHighScore({
      level: completedLevel.level,
      seed,
      score: completedLevel.score,
    });
  }, [level.level]);

  useEffect(() => {
    if (status === 'DONE') {
      saveHighScore({
        level: level.level,
        seed,
        score: level.score,
      });
    }
  }, [status]);
};
