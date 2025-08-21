import type { HighScores } from './types';

const HIGH_SCORE_ITEM = 'highScore';

const getHighScores = () => {
  try {
    const storedHighScores = localStorage.getItem(HIGH_SCORE_ITEM);
    if (!storedHighScores) return null;

    const highScores: HighScores = JSON.parse(storedHighScores);

    return highScores;
  } catch (e) {
    console.error('Error getting highscores', e);
    return null;
  }
};

export const getHighScoreForSeed = (seed: string) => {
  const highScores = getHighScores();
  if (!highScores) return null;

  return highScores[seed] ?? null;
};

export const saveHighScore = ({
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
};
