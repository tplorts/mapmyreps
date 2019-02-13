import _ from 'lodash';
import { createSelector } from 'reselect';
import * as Root from '../../rootTypes';
import * as nationalSelectors from '../nation/selectors';
import { StateMapProps } from './types';

function getStateFeaturesOfNationalAtlas(root: Root.State) {
  return _.get(nationalSelectors.getAtlas(root), 'features', []);
}

function getSelectedStatePostalCode(root: any, props: StateMapProps) {
  return props.postalCode;
}

export const getStateFeature = createSelector(
  [getStateFeaturesOfNationalAtlas, getSelectedStatePostalCode],
  (allStateFeatures, postal) => _.find(allStateFeatures, { postal })
);

function getRepresentativesOfActiveState(root: any, props: StateMapProps) {
  return props.representatives;
}

export const getDistrictLinkIndex = createSelector(
  getRepresentativesOfActiveState,
  reps => _.keyBy(reps, 'district')
);
