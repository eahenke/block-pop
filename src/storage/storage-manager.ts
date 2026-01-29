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
    console.error('Unable to persist storage', e);
    return;
  }
};
