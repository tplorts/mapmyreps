import _ from 'lodash';
import * as Root from '../rootTypes';

const getBranch = (state: Root.State) => state.congress;

export function getLegislators(state: Root.State) {
  return getBranch(state).legislators;
}

export function getLegislatorsForState(state: Root.State, postal: string) {
  return getLegislators(state)[_.toLower(postal)] || [];
}
