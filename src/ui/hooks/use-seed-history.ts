import { useEffect } from 'react';
import { useGame } from './use-game';
import { deleteSeedInfo, getSeedHistory, saveSeedInfo } from '../../storage';
import { notifications } from '@mantine/notifications';
import { useDexieQuery } from './db';
import { isQuotaExceededError } from '../../storage/utils';
import { logger } from '../../util/logger';

export const useSaveSeedHistory = () => {
  const { game } = useGame();
  const { status, mode } = game;

  useEffect(() => {
    async function save() {
      if (mode === 'SINGLE' && status === 'DONE') {
        try {
          await saveSeedInfo(game.seedInfo);
        } catch (e) {
          if (isQuotaExceededError(e)) {
            notifications.show({
              title: 'Save Failed',
              message: 'Storage full. Try deleting some records from History',
              autoClose: false,
              color: 'red',
            });
            return;
          }
          logger.error('Failed to save', e);

          // General fallback
          notifications.show({
            title: 'Save Failed',
            message: (e as Error).message || '',
            autoClose: false,
            color: 'red',
          });
        }
      }
    }
    save();
  }, [status]);
};

// TODO: break delete into own hook w/ error handling
export const useSeedHistory = () => {
  const results = useDexieQuery(getSeedHistory);

  return {
    seedHistory: results.data,
    deleteSeedInfo: deleteSeedInfo,
    loading: results.loading,
    error: results.error,
  };
};
