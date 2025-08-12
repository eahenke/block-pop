import { useCallback, useEffect } from 'react';
import { useGame } from './use-game';

const HIGH_SCORE_ITEM = 'highScore';

type HighScore = Record<number, number>;

type HighScores = Record<string, HighScore>;

export const useHighScore = () => {
  const { game } = useGame();
  const { level, seed } = game;

  const getHighScores = () => {
    const storedHighScores = localStorage.getItem(HIGH_SCORE_ITEM);
    if (!storedHighScores) return null;

    const highScores: HighScores = JSON.parse(storedHighScores);

    return highScores;
  };

  const getHighScore = (seed: string, level: number): number | null => {
    try {
      const highScores = getHighScores();
      if (!highScores) return null;

      return highScores[seed]?.[level] ?? null;
    } catch (e) {
      console.error('Error getting highscores', e);
      return null;
    }
  };

  const saveHighScore = useCallback(
    ({
      seed,
      score,
      level,
    }: {
      seed: string;
      score: number;
      level: number;
    }): void => {
      const highScores = getHighScores() || {};
      try {
        const levelHighScore = highScores[seed]?.[level] || 0;
        if (score <= levelHighScore) {
          return;
        }

        const updatedRecord = {
          ...highScores,
          [seed]: {
            ...highScores[seed],
            [level]: score,
          },
        };

        localStorage.setItem(HIGH_SCORE_ITEM, JSON.stringify(updatedRecord));
      } catch (e) {
        console.error('Failed to save highscore', e);
        return;
      }
    },
    []
  );

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

  return {
    getHighScore,
    // saveHighScore,
  };
};
