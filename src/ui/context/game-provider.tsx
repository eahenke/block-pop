import { useReducer, type ReactNode } from 'react';
import { gameReducer, initGame } from '../../game/game';
import { ACTIONS } from '../../game/actions';
import { GameContext } from './game-context';
import type { ViewOptions } from '../../game/types';

const seed = '1234567890';

const initialState = initGame(seed);

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
    dispatch({
      type: ACTIONS.INIT,
      payload: {
        seed,
        reset,
      },
    });
  };

  const setViewOptions = (options: Partial<ViewOptions>) => {
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
