import React, { useContext, useReducer, type ReactNode } from 'react';
import { gameReducer, initGame, type GameType } from '../../game/game';
import { ACTIONS } from '../../game/actions';

const seed = '1234567890';

type GameContext = {
  game: GameType;
  restart: () => void;
  remove: (x: number, y: number) => void;
  update: () => void;
};

const GameContext = React.createContext<GameContext | null>(null);

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [game, dispatch] = useReducer(gameReducer, initGame(seed));

  const restart = () => {
    dispatch({
      type: ACTIONS.RESTART,
    });
  };

  const remove = (x: number, y: number) => {
    dispatch({
      type: ACTIONS.REMOVE,
      payload: {
        x,
        y,
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

// TODO: move to hook, maybe have actions in there?
export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used inside of a <GameProvider />');
  }

  return context;
};
