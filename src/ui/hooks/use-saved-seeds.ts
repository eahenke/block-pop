type SavedSeed = {
  name: string;
  seed: string;
};

type SavedSeedRecord = Record<string, string>;

export const useSavedSeeds = () => {
  const getSavedSeeds = (): SavedSeed[] => {
    try {
      const seeds = localStorage.getItem('seeds');
      if (!seeds) return [];

      const record: SavedSeedRecord = JSON.parse(seeds);

      return Object.entries(record).map(([name, seed]) => ({ name, seed }));
    } catch (e) {
      console.log('Error getting seeds', e);
      return [];
    }
  };

  const saveSeed = (seed: SavedSeed) => {
    const seeds = localStorage.getItem('seeds');

    const record: SavedSeedRecord = seeds ? JSON.parse(seeds) : {};

    record[seed.name] = seed.seed;

    localStorage.setItem('seeds', JSON.stringify(record));
  };

  return {
    getSavedSeeds,
    saveSeed,
  };
};
