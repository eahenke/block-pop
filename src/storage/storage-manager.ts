import { logger } from '../util/logger';

const persist = async () => {
  return (
    navigator.storage &&
    navigator.storage.persist &&
    (await navigator.storage.persist())
  );
};

const isStoragePersisted = async () => {
  return (
    navigator.storage &&
    navigator.storage.persisted &&
    (await navigator.storage.persisted())
  );
};

export const tryPeristStorage = async () => {
  try {
    const isPersisted = await isStoragePersisted();
    if (!isPersisted) {
      await persist();
    }
  } catch (e) {
    logger.error('Unable to persist storage', e);
    return;
  }
};

export const getStorageEstimate = async (): Promise<StorageEstimate | null> => {
  if (!navigator.storage || !navigator.storage.estimate) {
    return null;
  }
  const estimate = await navigator.storage.estimate();

  return estimate;
};
