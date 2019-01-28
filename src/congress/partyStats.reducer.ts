import { ActionType } from 'typesafe-actions';
import { DeepReadonly } from 'utility-types';
import * as actions from './actions';
import { StatePartyStatsIndex } from './types';

export type State = DeepReadonly<StatePartyStatsIndex>;
export type Action = ActionType<typeof actions>;

const initial: State = {};

export default (prior = initial, action: Action) => {
  switch (action.type) {
    case actions.SET_PARTY_STATS:
      return action.payload;
    default:
      return prior;
  }
};
