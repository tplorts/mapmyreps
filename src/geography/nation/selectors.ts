import chroma from 'chroma-js';
import _ from 'lodash';
import { createSelector } from 'reselect';
import { getPartyStatsIndex } from '../../congress/selectors';
import { PartyCountIndex } from '../../congress/types';
import * as Root from '../../rootTypes';
import { partyColorIndex } from '../../style/colors';
import { getColoringChamber, getColorSpace } from './settings/selectors';

const getBranch = (state: Root.State) => state.geography.nation;

export const getAtlas = (state: Root.State) => getBranch(state).atlas;

export const getStateColorIndex = createSelector(
  [getPartyStatsIndex, getColoringChamber, getColorSpace],
  (partyStats, chamber, colorSpace) => {
    return _.mapValues(partyStats, statePartyStats =>
      getColorMix(statePartyStats[chamber], colorSpace)
    );
  }
);

function getColorMix(partyCounts: PartyCountIndex, colorSpace: string) {
  const weightedColors = _.chain(partyColorIndex)
    .toPairs()
    .map(([party, partyColor]) => {
      const count = partyCounts[party] || 0;
      return _.times(count, _.constant(partyColor));
    })
    .flatten()
    .value();

  return weightedColors.length
    ? chroma.average(weightedColors, colorSpace as any).css()
    : undefined;
}
