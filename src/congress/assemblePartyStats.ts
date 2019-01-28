import _ from 'lodash';
import { StateLegislatorsIndex } from './types';
import {
  filterToRepresentatives,
  filterToSenators,
  getPartyCounts,
} from './utilities';

export default function assemblePartyStats(
  legislatorIndex: StateLegislatorsIndex
) {
  return _.mapValues(legislatorIndex, stateLegislators => ({
    combined: getPartyCounts(stateLegislators),
    house: getPartyCounts(filterToRepresentatives(stateLegislators)),
    senate: getPartyCounts(filterToSenators(stateLegislators)),
  }));
}
