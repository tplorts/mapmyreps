import _ from 'lodash';
import allRegions from './AmericanRegions.json';
import { AmericanState, AmericanRegion } from './types.js';

function isStateOrFederalDistrict(region: AmericanRegion) {
  const loweredStatus = _.toLower(region.status);
  return loweredStatus === 'state' || loweredStatus === 'federal district';
}

const regionToState = (region: AmericanRegion) => ({
  ...region,
  postal: region.postal || '',
});

export const states: AmericanState[] = _.chain(allRegions)
  .filter(isStateOrFederalDistrict)
  .map(regionToState)
  .value();

// const maxStateFIPSCode = _.chain(states)
//   .map('fips')
//   .max()
//   .toInteger()
//   .value();

// const statesByFIPS = Array<AmericanState>(maxStateFIPSCode);

// _.forEach(states, state => {
//   statesByFIPS[state.fips] = state;
// });

const statesByFIPS = _.keyBy(states, 'fips');

export function getStateByFIPS(fipsCode: number) {
  return statesByFIPS[fipsCode];
}

const statesByPostal = _.keyBy(states, 'postal');

export function getStateByPostal(postalCode: string) {
  return statesByPostal[_.toUpper(postalCode)];
}

export function getStateNameForPostal(postalCode: string) {
  return _.get(getStateByPostal(postalCode), 'name', '');
}
