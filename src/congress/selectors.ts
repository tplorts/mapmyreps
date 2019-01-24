import _ from 'lodash';
import { createSelector } from 'reselect';
import * as Root from '../rootTypes';
import { RouteProps as StateRouteProps } from './StateView';
import { RouteProps as LegislatorRouteProps } from './LegislatorView';

const getBranch = (root: Root.State) => root.congress;

function getLegislatorIndex(root: Root.State) {
  return getBranch(root).legislators;
}

function getLegislatorsForState(root: Root.State, props: StateRouteProps) {
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

function getLegislatorBioguideId(root: any, props: LegislatorRouteProps) {
  return _.toUpper(props.match.params.bioguideId);
}

export const getSelectedLegislator = createSelector(
  [getLegislatorsForState, getLegislatorBioguideId],
  (legislators, bioguideId) => _.find(legislators, { bioguideId })
);
