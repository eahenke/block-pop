import { useEffect } from 'react';
import { useGame } from './use-game';
import { saveSeedInfo } from '../../storage';

export const useSeedHistory = () => {
  const { game } = useGame();
  const { status, mode } = game;

  // TODO: reconsider how highscore works for endless mode
  // Endless mode
  //   useEffect(() => {
  //     if (level.level === 1) {
  //       return;
  //     }

  //     const completedLevel = game.completedLevels[level.level - 1];
  //     if (!completedLevel) {
  //       console.error('No completed level found for', level.level - 1);
  //       return;
  //     }

  //     // TODO: Test and handle for endless mode
  //     updateSeedInfo({ game, level: completedLevel, score: game.score })
  //   }, [level.level]);

  useEffect(() => {
    if (mode === 'SINGLE' && status === 'DONE') {
      saveSeedInfo(game.seedInfo);
    }
  }, [status]);
};
