import type { HighScore, HighScores, Level } from './types';

const HIGH_SCORE_ITEM = 'highScore';

export const isComplexHighScore = (hs: number | HighScore): hs is HighScore => {
  return typeof hs !== 'number';
};

export const getHighScoreValue = (hs?: number | HighScore | null): number => {
  if (!hs) return 0;

  return isComplexHighScore(hs) ? hs.score : hs;
};

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
  level: Level;
}): void => {
  const highScores = getHighScores() || {};
  try {
    const levelHighScore = highScores[seed]?.[level.level];

    const hsToCompare = getHighScoreValue(levelHighScore);

    if (score <= (hsToCompare || 0)) {
      return;
    }

    const updatedRecord = {
      ...highScores,
      [seed]: {
        ...highScores[seed],
        [level.level]: {
          score,
          moves: level.moves,
        },
      },
    };

    localStorage.setItem(HIGH_SCORE_ITEM, JSON.stringify(updatedRecord));
  } catch (e) {
    console.error('Failed to save highscore', e);
    return;
  }
};
