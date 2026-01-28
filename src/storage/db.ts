import { Dexie, type EntityTable, type Table } from 'dexie';

export type StoredAttempt = {
  seed: string;
  number: number;
  score: number;
  blocksRemaining: number;
  date: Date;
};

export type StoredHighScore = StoredAttempt & {
  moves: string;
};

export type StoredSeedInfo = {
  seed: string;
  attempts: number;
  lastPlayed: Date;
  highScore: StoredHighScore;
};

export const db = new Dexie('BlockPopDB') as Dexie & {
  seedInfo: EntityTable<StoredSeedInfo, 'seed'>;
  attempts: Table<StoredAttempt, [string, number]>;
};

db.version(1).stores({
  seedInfo: 'seed, lastPlayed, highScore.score',
  attempts: '[seed+number], seed, number, score, blocksRemaining, date',
});
