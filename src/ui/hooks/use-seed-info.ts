import { getSeedInfo } from '../../storage';
import { useDexieQuery } from './db';

export const useSeedInfo = (seed: string) => {
  const results = useDexieQuery(() => getSeedInfo(seed));

  return {
    seedInfo: results.data,
    loading: results.loading,
    error: results.error,
  };
};
