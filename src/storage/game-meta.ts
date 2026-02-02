import type { ViewOptions } from '../game/types';
import { logger } from '../util/logger';

const CURRENT_SEED_KEY = 'currentSeed';
const VIEW_OPTIONS_KEY = 'blockPopViewOptions';

export const getCurrentSeed = (): string | null => {
  try {
    return localStorage.getItem(CURRENT_SEED_KEY) || null;
  } catch (e) {
    logger.error('Error getting CurrentSeed', e);
    return null;
  }
};

export const saveCurrentSeed = (seed: string) => {
  localStorage.setItem(CURRENT_SEED_KEY, seed);
};

export const getViewOptions = (): ViewOptions | null => {
  try {
    const viewOptionsRaw = localStorage.getItem(VIEW_OPTIONS_KEY);
    if (!viewOptionsRaw) return null;

    const viewOptions: ViewOptions = JSON.parse(viewOptionsRaw);

    return viewOptions;
  } catch (e) {
    logger.error('Error getting ViewOptions', e);
    return null;
  }
};

export const saveViewOptions = (options: Partial<ViewOptions>) => {
  const currentViewOptions = getViewOptions() || {};

  const updatedOptions: ViewOptions = {
    ...currentViewOptions,
    ...options,
  };
  localStorage.setItem(VIEW_OPTIONS_KEY, JSON.stringify(updatedOptions));
};
