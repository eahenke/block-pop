import { getSeedHistoryLegacy, serializeMoves } from '../seed-info';
import {
  db,
  type StoredAttempt,
  type StoredHighScore,
  type StoredSeedInfo,
} from '../db';

export const needsSeedMigration = async () => {
  const count = await db.seedInfo.count();

  return !count;
};

let running = false;

export const migrateSeedInfo = async () => {
  const seedHistory = getSeedHistoryLegacy() || {};

  const attemptsToWrite: StoredAttempt[] = [];
  const seedInfoToWrite: StoredSeedInfo[] = [];

  Object.entries(seedHistory).forEach(([seed, seedInfo]) => {
    const storedAttempts: StoredAttempt[] = seedInfo.history.map(attempt => {
      return {
        seed,
        number: attempt.number,
        date: new Date(attempt.date),
        score: attempt.score,
        blocksRemaining: attempt.blocksRemaining ?? NaN,
      };
    });

    let hs: StoredHighScore = {
      seed,
      number: 0,
      score: 0,
      moves: '',
      blocksRemaining: 100,
      date: new Date(),
    };

    // Some older data may be missing, so treat as optional
    if (seedInfo.highScore) {
      const { highScore } = seedInfo;
      const matchingAttempt = seedInfo.history.find(attempt => {
        return attempt.number === highScore.attempt;
      });

      hs = {
        seed,
        number: seedInfo.highScore.attempt,
        score: seedInfo.highScore.score,
        moves: serializeMoves(seedInfo.highScore.moves),
        blocksRemaining: seedInfo.highScore.blocksRemaining,
        date: matchingAttempt?.date
          ? new Date(matchingAttempt.date)
          : new Date(),
      };
    }

    const storedSeedInfo: StoredSeedInfo = {
      seed,
      lastPlayed: new Date(seedInfo.lastPlayed),
      attempts: seedInfo.attempts,
      highScore: hs,
    };

    seedInfoToWrite.push(storedSeedInfo);
    attemptsToWrite.push(...storedAttempts);
  });

  try {
    if (running) {
      console.log('Already running.');
      return;
    }
    running = true;
    console.log('Starting migration...');
    const result = await db.transaction(
      'rw',
      'seedInfo',
      'attempts',
      async () => {
        await db.seedInfo.bulkAdd(seedInfoToWrite);
        await db.attempts.bulkPut(attemptsToWrite);
      }
    );
    running = false;
    console.log('Migration successful', { result });
  } catch (e) {
    running = false;
    console.error('Failed to migrate');
    console.error(e);
    throw e;
  }
};
