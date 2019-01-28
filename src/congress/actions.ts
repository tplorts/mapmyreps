import { action } from 'typesafe-actions';
import { StateLegislatorsIndex, StatePartyStatsIndex } from './types';

export const SET_LEGISLATORS = `CONGRESS/LEGISLATORS/SET`;
export function setLegislators(index: StateLegislatorsIndex) {
  return action(SET_LEGISLATORS, index);
}

export const SET_PARTY_STATS = `CONGRESS/PARTY_STATS/SET`;
export function setPartyStats(index: StatePartyStatsIndex) {
  return action(SET_PARTY_STATS, index);
}
