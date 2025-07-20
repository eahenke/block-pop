import { useReducer, type ReactNode } from 'react';
import { gameReducer, initGame } from '../../game/game';
import { ACTIONS } from '../../game/actions';
import { GameContext } from './game-context';

const seed = '1234567890';

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [game, dispatch] = useReducer(gameReducer, initGame(seed));

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

  const value = {
    game,
    restart,
    remove,
    update,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};
