import { db } from './db';

export const clearLogsBefore = async (date: Date) => {
  await db.logs.where('date').below(date).delete();
};

export const getLogs = async () => {
  return db.logs.toArray();
};
