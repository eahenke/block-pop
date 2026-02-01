import type {
  Attempt,
  Coord,
  SeedHistory,
  SeedInfo,
  SeedSummary,
} from '../game/types';
import { db, type StoredAttempt, type StoredSeedInfo } from './db';

export const SEED_INFO_KEY = 'seedInfo';

export const serializeMoves = (moves: Coord[]): string => {
  return moves.flat().join('');
};

export const deserializeMoves = (moveStr: string): Coord[] => {
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

/* Legacy LocalStorage operations */

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

type LegacySeedHistory = Record<string, SeedInfo>;

export const getSeedHistoryLegacy = (): LegacySeedHistory | null => {
  try {
    const seedHistoryRaw = localStorage.getItem(SEED_INFO_KEY);
    if (!seedHistoryRaw) return null;

    const seedHistory: LegacySeedHistory = JSON.parse(
      seedHistoryRaw,
      seedInfoReviver
    );

    return seedHistory || null;
  } catch (e) {
    console.error('Error getting SeedHistory', e);
    return null;
  }
};

/* New DB operations */

/* Converters */

const toAttempt = (raw: StoredAttempt): Attempt => {
  return {
    ...raw,
    date: raw.date.toISOString(),
  };
};

const toSeedSummary = (raw: StoredSeedInfo): SeedSummary => {
  return {
    ...raw,
    lastPlayed: raw.lastPlayed.toISOString(),
    highScore: {
      ...raw.highScore,
      attempt: raw.highScore?.number || 0,
      moves: deserializeMoves(raw.highScore.moves),
      date: raw.highScore.date.toISOString(),
    },
  };
};

const toSeedInfo = (
  raw: StoredSeedInfo,
  attempts: StoredAttempt[]
): SeedInfo => {
  return {
    ...toSeedSummary(raw),
    history: attempts.map(toAttempt),
  };
};

const toStoredSeedInfo = (seedInfo: SeedInfo): StoredSeedInfo => {
  return {
    seed: seedInfo.seed,
    attempts: seedInfo.attempts,
    lastPlayed: new Date(seedInfo.lastPlayed),
    highScore: {
      date: new Date(seedInfo.highScore.date),
      number: seedInfo.highScore.attempt,
      blocksRemaining: seedInfo.highScore.blocksRemaining,
      score: seedInfo.highScore.score,
      seed: seedInfo.seed,
      moves: serializeMoves(seedInfo.highScore!.moves),
    },
  };
};

const toStoredAttempt = (
  seed: string,
  attempt?: Attempt
): StoredAttempt | undefined => {
  if (!attempt) return undefined;
  const { blocksRemaining, number, date, score } = attempt;

  return {
    seed,
    date: new Date(date),
    blocksRemaining,
    number,
    score,
  };
};

/* Operations */

export const getSeedHistory = async (): Promise<SeedHistory> => {
  const storedSeedInfos = await db.seedInfo.toArray();
  const seedInfos = storedSeedInfos.map(toSeedSummary);
  const seedHistory = seedInfos.reduce((accum, si) => {
    accum[si.seed] = si;
    return accum;
  }, {} as SeedHistory);

  return seedHistory;
};

export const getSeedInfo = async (seed: string): Promise<SeedInfo | null> => {
  try {
    const results = await db.transaction(
      'r',
      'seedInfo',
      'attempts',
      async () => {
        const seedInfo = await db.seedInfo.get(seed);
        if (!seedInfo) {
          return null;
        }
        const attempts = await db.attempts.where('seed').equals(seed).toArray();

        return toSeedInfo(seedInfo, attempts);
      }
    );
    return results;
  } catch (e) {
    console.error('Error getting SeedInfo', e);
    return null;
  }
};

export const deleteSeedInfo = async (seed: string): Promise<void> => {
  await db.transaction('rw', 'seedInfo', 'attempts', async () => {
    await db.seedInfo.delete(seed);
    await db.attempts.where('seed').equals(seed).delete();
  });
};

export const saveSeedInfo = async (seedInfo: SeedInfo): Promise<void> => {
  const storedSeedInfo = toStoredSeedInfo(seedInfo);
  const storedAttempt = toStoredAttempt(seedInfo.seed, seedInfo.history.at(-1));

  await db.transaction('rw', 'seedInfo', 'attempts', async () => {
    await db.seedInfo.put(storedSeedInfo);
    if (storedAttempt) {
      await db.attempts.put(storedAttempt);
    }
  });
};

export const deleteAllSeedInfo = async (): Promise<void> => {
  try {
    await db.transaction('rw', 'seedInfo', 'attempts', async () => {
      await db.seedInfo.clear();
      await db.attempts.clear();
    });
  } catch (e) {
    console.error('Failed to clear game data', e);
  }
};
