import React from 'react';
import type { GameType } from '../../game/game';

export type GameContext = {
  game: GameType;
  restart: () => void;
  remove: (col: number, row: number) => void;
  update: () => void;
};

export const GameContext = React.createContext<GameContext | null>(null);
