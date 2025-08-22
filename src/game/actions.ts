import type { ViewOptions } from './types';

export const ACTIONS = {
  INIT: 'INIT',
  RESTART: 'RESTART',
  REMOVE: 'REMOVE',
  UPDATE: 'UPDATE',
  SET_VIEW_OPTIONS: 'SET_VIEW_OPTIONS',
} as const;

type InitAction = {
  type: typeof ACTIONS.INIT;
  payload: {
    seed: string;
    reset?: boolean;
  };
};

type RemoveAction = {
  type: typeof ACTIONS.REMOVE;
  payload: {
    row: number;
    col: number;
  };
};

type UpdateAction = {
  type: typeof ACTIONS.UPDATE;
};

type RestartAction = {
  type: typeof ACTIONS.RESTART;
};

type SetViewOptionsAction = {
  type: typeof ACTIONS.SET_VIEW_OPTIONS;
  payload: Partial<ViewOptions>;
};

export type Action =
  | InitAction
  | RemoveAction
  | UpdateAction
  | RestartAction
  | SetViewOptionsAction;
