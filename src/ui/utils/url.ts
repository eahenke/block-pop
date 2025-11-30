const SEED_PARAM = 'seed';

export const createDeepLinkSeed = (seed: string) => {
  return `${window.origin}${window.location.pathname}?${SEED_PARAM}=${seed}`;
};

export const getDeepLinkSeed = (): string | null => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(SEED_PARAM);
};
