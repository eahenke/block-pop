import type { SeedHistory, SeedInfo } from '../game/types';

const SEED_INFO_KEY = 'seedInfo';

const getSeedHistory = (): SeedHistory | null => {
  try {
    const seedHistoryRaw = localStorage.getItem(SEED_INFO_KEY);
    if (!seedHistoryRaw) return null;

    const seedHistory: SeedHistory = JSON.parse(seedHistoryRaw);

    return seedHistory || null;
  } catch (e) {
    console.error('Error getting SeedHistory', e);
    return null;
  }
};

export const getSeedInfo = (seed: string): SeedInfo | null => {
  try {
    const seedHistory = getSeedHistory();
    if (!seedHistory) return null;

    return seedHistory[seed] || null;
  } catch (e) {
    console.error('Error getting SeedInfo', e);
    return null;
  }
};

export const saveSeedInfo = (seedInfo: SeedInfo): void => {
  const seedHistory = getSeedHistory() || {};

  localStorage.setItem(
    SEED_INFO_KEY,
    JSON.stringify({
      ...seedHistory,
      [seedInfo.seed]: seedInfo,
    })
  );
};
