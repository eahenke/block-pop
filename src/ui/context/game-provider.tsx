import { useEffect, useReducer, useState, type ReactNode } from 'react';
import { gameReducer, initGame } from '../../game/game';
import { ACTIONS } from '../../game/actions';
import { GameContext } from './game-context';
import type { ViewOptions } from '../../game/types';
import {
  getCurrentSeed,
  getViewOptions,
  saveCurrentSeed,
  saveViewOptions,
} from '../../storage/game-meta';
import { getSeedInfo } from '../../storage';
import { getDeepLinkSeed } from '../utils/url';
import { Loading } from '../components/common';

const defaultInitialSeed = '1234567890';

// INIT
const initialViewOptions = getViewOptions();
const initialSeed = getDeepLinkSeed() || getCurrentSeed() || defaultInitialSeed;

const initialState = initGame({
  seed: initialSeed,
  viewOptions: initialViewOptions || undefined,
  seedInfo: null,
  reset: true,
});

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const [game, dispatch] = useReducer(gameReducer, initialState);

  useEffect(() => {
    async function loadInitial(seed: string) {
      await init(seed, true);
      setLoading(false);
    }
    loadInitial(initialSeed);
  }, []);

  const restart = () => {
    dispatch({
      type: ACTIONS.RESTART,
    });
  };

  const remove = (col: number, row: number) => {
    dispatch({
      type: ACTIONS.REMOVE,
      payload: {
        row,
        col,
      },
    });
  };

  const update = () => {
    dispatch({
      type: ACTIONS.UPDATE,
    });
  };

  const init = async (seed: string, reset = false) => {
    const currentSeed = getCurrentSeed();
    const viewOptions = getViewOptions();
    const seedInfo = await getSeedInfo(seed);

    if (currentSeed !== seed) {
      saveCurrentSeed(seed);
    }

    dispatch({
      type: ACTIONS.INIT,
      payload: {
        seed,
        reset,
        viewOptions: viewOptions,
        seedInfo,
      },
    });
  };

  const setViewOptions = (options: Partial<ViewOptions>) => {
    saveViewOptions(options);
    dispatch({
      type: ACTIONS.SET_VIEW_OPTIONS,
      payload: options,
    });
  };

  const value = {
    game,
    restart,
    remove,
    update,
    init,
    setViewOptions,
  };

  return (
    <GameContext.Provider value={value}>
      {loading ? <Loading visible /> : children}
    </GameContext.Provider>
  );
};
