import _ from 'lodash';
import * as Root from '../../../rootTypes';

const getBranch = (state: Root.State) => state.geography.nation.settings;

export const getColoringChamber = (root: Root.State) =>
  getBranch(root).coloringChamber;

export const getColorSpace = (root: Root.State) => getBranch(root).colorSpace;
