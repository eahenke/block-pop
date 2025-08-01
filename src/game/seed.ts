import { SEED_CHARS, SEED_LENGTH } from './constants';

const randomString = (charset: string, length: number) => {
  let str = '';
  while (str.length < length) {
    const rIdx = Math.floor(Math.random() * charset.length);
    str += charset[rIdx];
  }
  return str;
};

export const generateSeed = () => {
  return randomString(SEED_CHARS, SEED_LENGTH);
};
