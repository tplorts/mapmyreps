import { ActionType } from 'typesafe-actions';
import { DeepReadonly } from 'utility-types';
import * as actions from './actions';
import { NationalAtlas } from './types';

export type State = DeepReadonly<NationalAtlas>;
export type Action = ActionType<typeof actions>;

const initial: State = {
  features: [],
  borders: '',
  size: {
    width: 0,
    height: 0,
  },
  offset: {
    x: 0,
    y: 0,
  },
};

export default (prior = initial, action: Action) => {
  switch (action.type) {
    case actions.SET_NATIONAL_ATLAS:
      return action.payload;
    default:
      return prior;
  }
};
