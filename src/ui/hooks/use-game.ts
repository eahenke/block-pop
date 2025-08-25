import { useContext } from 'react';
import { GameContext } from '../context/game-context';
import { isGameActive, isValidMove } from '../../game/game';
import type { GameType, ViewOptions } from '../../game/types';

type GameUiInterface = {
  game: GameType;
  removeBlock: (col: number, row: number) => void;
  init: (seed: string, reset?: boolean) => void;
  restart: () => void;
  setViewOptions: (options: Partial<ViewOptions>) => void;
};

export const useGame = (): GameUiInterface => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used inside of a <GameProvider />');
  }

  const { game, remove, update, init, setViewOptions, restart } = context;

  const removeBlock = (col: number, row: number) => {
    if (!isGameActive(game) || !isValidMove(game.board, [col, row])) {
      return;
    }

    remove(col, row);
    setTimeout(() => {
      update();
    }, 100);
  };

  return {
    game,
    init,
    restart,
    removeBlock,
    setViewOptions,
  };
};
