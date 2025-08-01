import Rand from 'rand-seed';

export type Rng = {
  random: () => number;
  seed: string;
};

let rng: Rng | null = null;

export const getRng = (seed: string, reset = false): Rng => {
  if (rng && seed === rng.seed && !reset) {
    return rng;
  }

  const rand = new Rand(seed);
  rng = {
    random: () => rand.next(),
    seed,
  };

  return rng;
};
