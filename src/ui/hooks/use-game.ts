import { useContext } from 'react';
import { GameContext } from '../context/game-context';
import { isValidMove, type GameType } from '../../game/game';

type GameUiInterface = {
  game: GameType;
  removeBlock: (col: number, row: number) => void;
};

export const useGame = (): GameUiInterface => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used inside of a <GameProvider />');
  }

  const { game, remove, update } = context;

  const removeBlock = (col: number, row: number) => {
    if (!isValidMove(game.board, [col, row])) {
      return;
    }

    remove(col, row);
    setTimeout(() => {
      update();
    }, 100);
  };

  return {
    game,
    removeBlock,
  };
};
