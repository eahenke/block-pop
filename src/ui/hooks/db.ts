import { useLiveQuery } from 'dexie-react-hooks';
import { logger } from '../../util/logger';

export type QueryResult<T> = {
  data: T | null;
  loading: boolean;
  error: Error | null;
};

export const useDexieQuery = <T>(query: () => Promise<T>): QueryResult<T> => {
  const results = useLiveQuery(async () => {
    try {
      const result = await query();

      return { data: result, error: null };
    } catch (e) {
      logger.error('Dexie query error', e);
      return {
        data: null,
        error: e instanceof Error ? e : new Error(JSON.stringify(e)),
      };
    }
  });
  if (results === undefined) {
    return { data: null, loading: true, error: null };
  } else if (results.error) {
    return { data: null, loading: false, error: results.error };
  }

  return { data: results.data, error: null, loading: false };
};
