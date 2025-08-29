import { useEffect, useState } from 'react';
import { useGame } from './use-game';
import {
  deleteSeedInfo,
  getSeedHistory,
  saveSeedInfo,
  SEED_INFO_KEY,
} from '../../storage';
import { isQuotaExceededError } from '../../storage/utils';
import { notifications } from '@mantine/notifications';
import type { SeedHistory } from '../../game/types';

export const useSaveSeedHistory = () => {
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
      try {
        saveSeedInfo(game.seedInfo);
      } catch (e) {
        if (isQuotaExceededError(e)) {
          notifications.show({
            title: 'Save Failed',
            message: 'LocalStorage full. Try deleting some high scores.',
            autoClose: false,
            color: 'red',
          });
        }
      }
    }
  }, [status]);
};

export const useSeedHistory = () => {
  const seedHistory = getSeedHistory() || {};
  const [hist, setHist] = useState<SeedHistory>(seedHistory);

  useEffect(() => {
    const handleLocalStorageChange = (event: StorageEvent) => {
      if (event.storageArea === localStorage && event.key === SEED_INFO_KEY) {
        setHist(getSeedHistory() || {});
      }
    };

    window.addEventListener('storage', handleLocalStorageChange, false);

    return () => {
      window.removeEventListener('storage', handleLocalStorageChange, false);
    };
  }, []);

  return {
    seedHistory: hist,
    deleteSeedInfo,
  };
};
