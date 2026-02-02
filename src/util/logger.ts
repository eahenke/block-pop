import { Logger, type ILogObj, type IMeta } from 'tslog';
import { db, type StoredLog } from '../storage/db';
import { DEV } from '../config/environment';

export const logger = new Logger({
  hideLogPositionForProduction: !DEV,
  argumentsArrayName: 'args',
});

// Browser is untyped on IMeta for some reason, but is present
const isMetaObject = (x: unknown): x is IMeta & { browser?: string } => {
  return (
    x !== null &&
    typeof x === 'object' &&
    Object.prototype.hasOwnProperty.call(x, 'date') &&
    Object.prototype.hasOwnProperty.call(x, 'logLevelId')
  );
};

const toStoredLog = (rawLog: ILogObj): StoredLog => {
  const meta =
    rawLog._meta && isMetaObject(rawLog._meta) ? rawLog._meta : undefined;
  const level = meta?.logLevelId ?? 0;

  return {
    date: meta?.date || new Date(),
    level,
    args: rawLog.args as unknown[],
    browser: meta?.browser || window.navigator.userAgent,
  };
};

const indexedDbTransport = async (logObj: ILogObj) => {
  const storedLog = toStoredLog(logObj);
  db.logs.add(storedLog);
};

logger.attachTransport(indexedDbTransport);
