import _ from 'lodash';
import { createSelector } from 'reselect';
import * as Root from '../rootTypes';
import { LegislatorRouteProps, StateRouteProps } from './routes';

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

const getIndexOfSelectedLegislator = createSelector(
  [getLegislatorsForState, getLegislatorBioguideId],
  (legislators, bioguideId) => _.findIndex(legislators, { bioguideId })
);

export const getSelectedLegislator = createSelector(
  [getLegislatorsForState, getIndexOfSelectedLegislator],
  (legislators, indexOfSelected) => _.get(legislators, indexOfSelected, null)
);

export const getNextLegislatorUrlSegment = createSelector(
  [getLegislatorsForState, getIndexOfSelectedLegislator],
  (legislators, indexOfSelected) => {
    if (indexOfSelected >= legislators.length - 1) {
      return null;
    }

    const indexOfNext = indexOfSelected === null ? 0 : indexOfSelected + 1;
    return legislators[indexOfNext].urlSegment;
  }
);

export const getPreviousLegislatorUrlSegment = createSelector(
  [getLegislatorsForState, getIndexOfSelectedLegislator],
  (legislators, indexOfSelected) => {
    if (indexOfSelected <= 0) {
      return null;
    }

    const indexOfNext = indexOfSelected === null ? 0 : indexOfSelected - 1;
    return legislators[indexOfNext].urlSegment;
  }
);
