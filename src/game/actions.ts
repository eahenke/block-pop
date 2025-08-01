export const ACTIONS = {
  INIT: 'INIT',
  RESTART: 'RESTART',
  REMOVE: 'REMOVE',
  UPDATE: 'UPDATE',
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

export type Action = InitAction | RemoveAction | UpdateAction | RestartAction;
