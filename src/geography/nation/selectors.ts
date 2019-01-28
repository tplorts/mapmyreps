import chroma from 'chroma-js';
import _ from 'lodash';
import { createSelector } from 'reselect';
import { getPartyStatsIndex } from '../../congress/selectors';
import * as Root from '../../rootTypes';
import { partyColorIndex } from '../../style/colors';
import { PartyCountIndex } from '../../congress/types';

const getBranch = (state: Root.State) => state.geography.nation;

export const getAtlas = (state: Root.State) => getBranch(state).atlas;

export const getMapScaleFactor = (state: Root.State) =>
  getBranch(state).scaleFactor;

const getStateColorMode = () => 'combined';

export const getStateColorIndex = createSelector(
  [getPartyStatsIndex, getStateColorMode],
  (partyStats, colorMode) => {
    return _.mapValues(partyStats, statePartyStats =>
      getColorMix(statePartyStats[colorMode])
    );
  }
);

function getColorMix(partyCounts: PartyCountIndex) {
  const weightedColors = _.chain(partyColorIndex)
    .toPairs()
    .map(([party, partyColor]) => {
      const count = partyCounts[party] || 0;
      return _.times(count, _.constant(partyColor));
    })
    .flatten()
    .value();

  return weightedColors.length
    ? chroma.average(weightedColors, 'lrgb' as any).css()
    : undefined;
}
