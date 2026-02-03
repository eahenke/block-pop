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

export type StoredLog = {
  level: number;
  date: Date;
  browser: string;
  args: unknown[];
  name: string;
};

export const db = new Dexie('BlockPopDB') as Dexie & {
  seedInfo: EntityTable<StoredSeedInfo, 'seed'>;
  attempts: Table<StoredAttempt, [string, number]>;
  logs: Table<StoredLog, ''>;
};

db.version(2).stores({
  seedInfo: 'seed, lastPlayed, highScore.score',
  attempts: '[seed+number], seed, number, score, blocksRemaining, date',
  logs: '++, date, level',
});
