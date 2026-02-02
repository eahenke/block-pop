import { useEffect, useState } from 'react';
import { getStorageEstimate } from '../../storage';
import { logger } from '../../util/logger';

export const useStorageEstimate = () => {
  const [estimate, setEstimate] = useState<StorageEstimate | null>(null);
  const [loading, setLoading] = useState(false);

  async function getEstimate() {
    setLoading(true);
    try {
      const data = await getStorageEstimate();
      setEstimate(data);
    } catch (e) {
      logger.error('Failed to get storage estimate', e);
      setEstimate(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getEstimate();
  }, []);

  return {
    estimate,
    loading,
    refetch: getEstimate,
  };
};
