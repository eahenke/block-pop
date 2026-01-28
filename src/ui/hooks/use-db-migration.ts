import { useEffect, useRef, useState } from 'react';
import {
  migrateSeedInfo,
  needsSeedMigration,
} from '../../storage/migrate/migrate-seed-info';

export const useDbMigration = () => {
  const runningRef = useRef<boolean>(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function runMigration() {
      runningRef.current = true;
      setLoading(true);
      try {
        const shouldMigrate = await needsSeedMigration();
        if (shouldMigrate) {
          await migrateSeedInfo();
        }
      } catch (e) {
        console.error('Failed to migrate seed');
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    if (!runningRef.current) {
      runMigration();
    }
  }, []);

  return {
    loading,
  };
};
