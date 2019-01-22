import { ActionType } from 'typesafe-actions';
import { DeepReadonly } from 'utility-types';
import * as actions from './actions';

export type State = DeepReadonly<number>;
export type Action = ActionType<typeof actions>;

const initial: State = 0;

export default (prior = initial, action: Action) => {
  switch (action.type) {
    case actions.SET_MAP_SCALE_FACTOR:
      return action.payload;
    default:
      return prior;
  }
};
