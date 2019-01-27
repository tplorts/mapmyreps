import { fetchJSON } from '../../utilities/fetchJSON';
import { ViewSize } from '../types';
import { getStateByPostal } from '../AmericanStates';
import transformDistricts from './transformDistricts';

export default async function fetchStateDistricts(
  statePostalCode: string,
  viewSize: ViewSize
) {
  const fips = getStateByPostal(statePostalCode)
    .fips.toString()
    .padStart(2, '0');

  const districtsTopology = await fetchJSON(
    `http://dev-data.mapmyreps.us/geography/districts/${fips}.json`
  );

  return transformDistricts(districtsTopology, statePostalCode, viewSize);
}
