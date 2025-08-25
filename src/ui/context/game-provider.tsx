import { useReducer, type ReactNode } from 'react';
import { gameReducer, initGame } from '../../game/game';
import { ACTIONS } from '../../game/actions';
import { GameContext } from './game-context';
import type { ViewOptions } from '../../game/types';
import {
  getGameMeta,
  saveGameMeta,
  saveViewOptions,
} from '../../storage/game-meta';
import { getSeedInfo } from '../../storage';

const defaultInitialSeed = '1234567890';

// INIT
const gameMeta = getGameMeta();
const initialSeed = gameMeta?.currentSeed || defaultInitialSeed;
const seedInfo = getSeedInfo(initialSeed);

const initialState = initGame({
  seed: initialSeed,
  viewOptions: gameMeta?.viewOptions,
  seedInfo,
  reset: true,
});

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [game, dispatch] = useReducer(gameReducer, initialState);

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

  const init = (seed: string, reset = false) => {
    const gameMeta = getGameMeta();
    const seedInfo = getSeedInfo(seed);

    // TODO: default view options function
    saveGameMeta(
      gameMeta ?? {
        currentSeed: seed,
        viewOptions: { hint: false, colorblind: false },
      }
    );

    dispatch({
      type: ACTIONS.INIT,
      payload: {
        seed,
        reset,
        viewOptions: gameMeta?.viewOptions,
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

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};
