import React from 'react';
import type { GameType } from '../../game/types';

export type GameContext = {
  game: GameType;
  restart: () => void;
  remove: (col: number, row: number) => void;
  update: () => void;
  init: (seed: string, reset?: boolean) => void;
};

export const GameContext = React.createContext<GameContext | null>(null);
