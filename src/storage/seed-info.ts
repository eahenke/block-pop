import type { Coord, SeedHistory, SeedInfo } from '../game/types';

export const SEED_INFO_KEY = 'seedInfo';

const fireEvent = () => {
  const event = new StorageEvent('storage', {
    key: SEED_INFO_KEY,
    url: window.location.href,
    storageArea: localStorage,
  });

  window.dispatchEvent(event);
};

const serializeMoves = (moves: Coord[]): string => {
  return moves.flat().join('');
};

const deserializeMoves = (moveStr: string): Coord[] => {
  const moves = [];
  for (let i = 0; i < moveStr.length; i += 2) {
    const coord: Coord = [
      parseInt(moveStr[i], 10),
      parseInt(moveStr[i + 1], 10),
    ];
    moves.push(coord);
  }

  return moves;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const seedInfoReviver = (key: string, value: any) => {
  if (key === 'moves' && typeof value === 'string') {
    return deserializeMoves(value);
  }

  // Backwards compat for old seeds without stored history
  if (value.seed && value.seed === key && !value.history) {
    return {
      ...value,
      history: [],
    };
  }

  return value;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const seedInfoReplacer = (key: string, value: any) => {
  if (key === 'moves') return serializeMoves(value);

  return value;
};

export const getSeedHistory = (): SeedHistory | null => {
  try {
    const seedHistoryRaw = localStorage.getItem(SEED_INFO_KEY);
    if (!seedHistoryRaw) return null;

    const seedHistory: SeedHistory = JSON.parse(
      seedHistoryRaw,
      seedInfoReviver
    );

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
    JSON.stringify(
      {
        ...seedHistory,
        [seedInfo.seed]: seedInfo,
      },
      seedInfoReplacer
    )
  );
  fireEvent();
};

export const deleteSeedInfo = (seed: string): void => {
  const seedHistory = getSeedHistory();
  if (!seedHistory) return;

  const newSeedHistory = {
    ...seedHistory,
  };

  delete newSeedHistory[seed];

  localStorage.setItem(
    SEED_INFO_KEY,
    JSON.stringify(newSeedHistory, seedInfoReplacer)
  );
  fireEvent();
};
