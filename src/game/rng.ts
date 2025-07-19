import Rand from 'rand-seed';

type Rng = {
  random: () => number;
  seed: string;
};

let rng: Rng | null = null;

export const getRng = (seed: string): Rng => {
  if (rng && seed === rng.seed) {
    return rng;
  }

  const rand = new Rand(seed);
  rng = {
    random: () => rand.next(),
    seed,
  };

  return rng;
};
