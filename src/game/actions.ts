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
  };
};

type RemoveAction = {
  type: typeof ACTIONS.REMOVE;
  payload: {
    x: number;
    y: number;
  };
};

type UpdateAction = {
  type: typeof ACTIONS.UPDATE;
};

type RestartAction = {
  type: typeof ACTIONS.RESTART;
};

export type Action = InitAction | RemoveAction | UpdateAction | RestartAction;
