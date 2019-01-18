import _ from 'lodash';
import allRegions from '../fixtures/USARegions.json';

export interface USARegion {
  name: string;
  status: string;
  fips: number;
  postal?: string;
}

export interface USAState extends USARegion {
  postal: string;
}

const isStateOrDistrict = (status: string) => {
  const loweredStatus = _.toLower(status);
  return loweredStatus === 'state' || loweredStatus === 'federal district';
};

export const states: USAState[] = _.chain(allRegions)
  .filter(region => isStateOrDistrict(region.status))
  .map(region => ({
    ...region,
    postal: _.toLower(region.postal || ''),
  }))
  .value();

const maxStateFIPSCode = _.chain(states)
  .map('fips')
  .max()
  .toInteger()
  .value();

const statesByFIPS = Array<USAState>(maxStateFIPSCode);

_.forEach(states, state => {
  statesByFIPS[state.fips] = state;
});

export function getStateByFIPS(fipsCode: number) {
  return statesByFIPS[fipsCode];
}

const statesByPostal = _.keyBy(states, 'postal');

export function getStateByPostal(postalCode: string) {
  return statesByPostal[postalCode];
}
