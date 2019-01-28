import _ from 'lodash';
import { Representative, Senator, Legislator } from './types';
import { DeepReadonly } from 'utility-types';

export function filterToSenators(legislators: DeepReadonly<Legislator[]>) {
  return _.filter(legislators, 'isSenator') as Senator[];
}

export function filterToRepresentatives(
  legislators: DeepReadonly<Legislator[]>
) {
  return _.filter(legislators, 'isRepresentative') as Representative[];
}

export function getPartyCounts(legislators: DeepReadonly<Legislator[]>) {
  return _.countBy(legislators, 'party');
}
