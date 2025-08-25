import type { GameMeta, ViewOptions } from '../game/types';

const GAME_META_KEY = 'gameMeta';

export const getGameMeta = (): GameMeta | null => {
  try {
    const gameMetaRaw = localStorage.getItem(GAME_META_KEY);
    if (!gameMetaRaw) return null;

    const gameMeta: GameMeta = JSON.parse(gameMetaRaw);

    return gameMeta;
  } catch (e) {
    console.error('Error getting GameMeta', e);
    return null;
  }
};

export const saveViewOptions = (options: Partial<ViewOptions>) => {
  const currentGameMeta = getGameMeta();
  if (!currentGameMeta) return;

  const updatedGameMeta: GameMeta = {
    ...currentGameMeta,
    viewOptions: {
      ...currentGameMeta?.viewOptions,
      ...options,
    },
  };
  localStorage.setItem(GAME_META_KEY, JSON.stringify(updatedGameMeta));
};

export const saveGameMeta = (gameMeta: Partial<GameMeta>) => {
  const currentGameMeta = getGameMeta();
  const updatedGameMeta = {
    ...currentGameMeta,
    ...gameMeta,
  };
  localStorage.setItem(GAME_META_KEY, JSON.stringify(updatedGameMeta));
};
