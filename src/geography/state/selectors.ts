import _ from 'lodash';
import * as Root from '../../rootTypes';
import * as nationalSelectors from '../nation/selectors';
import { createSelector } from 'reselect';
import { StateMapProps } from './Props';

const getStateFeaturesOfNationalAtlas = (root: Root.State) =>
  nationalSelectors.getAtlas(root).features;

const getSelectedStatePostalCode = (root: any, props: StateMapProps) =>
  _.toLower(props.postalCode);

export const getStateFeature = createSelector(
  [getStateFeaturesOfNationalAtlas, getSelectedStatePostalCode],
  (allStateFeatures, postal) => _.find(allStateFeatures, { postal })
);
