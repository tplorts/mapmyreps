import * as Root from '../../rootTypes';

const getBranch = (state: Root.State) => state.geography.nation;

export const getAtlas = (state: Root.State) => getBranch(state).atlas;

export const getMapScaleFactor = (state: Root.State) =>
  getBranch(state).scaleFactor;
