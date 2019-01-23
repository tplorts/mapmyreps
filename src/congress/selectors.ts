import _ from 'lodash';
import { createSelector } from 'reselect';
import * as Root from '../rootTypes';
import { RouteProps as StateRouteProps } from './StateView';

const getBranch = (root: Root.State) => root.congress;

export function getLegislatorIndex(root: Root.State) {
  return getBranch(root).legislators;
}

export function getLegislatorsForState(
  root: Root.State,
  props: StateRouteProps
) {
  const postalCode = _.toLower(props.match.params.postal);
  return getLegislatorIndex(root)[postalCode] || [];
}

export const getSenatorsForState = createSelector(
  getLegislatorsForState,
  legislators => _.filter(legislators, 'isSenator')
);

export const getRepresentativesForState = createSelector(
  getLegislatorsForState,
  legislators => _.filter(legislators, 'isRepresentative')
);
