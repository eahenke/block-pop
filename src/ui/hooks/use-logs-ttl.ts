import { useEffect } from 'react';
import { clearLogsBefore } from '../../storage/logs';

const daysAgo = (days: number): Date => {
  return new Date(Date.now() - 60 * 60 * 1000 * 24 * days);
};

export const useLogsTtl = (days: number) => {
  useEffect(() => {
    clearLogsBefore(daysAgo(days));
  }, []);
};
