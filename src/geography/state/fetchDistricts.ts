import { fetchJSON } from '../../utilities/fetchJSON';
import { getStateByPostal } from '../AmericanStates';
import { GEOGRAPHY_DATA_URL } from '../constants';
import { XYSize } from '../types';
import transformDistricts from './transformDistricts';

export default async function fetchStateDistricts(
  statePostalCode: string,
  viewSize: XYSize
) {
  const fips = getStateByPostal(statePostalCode)
    .fips.toString()
    .padStart(2, '0');

  const url = `${GEOGRAPHY_DATA_URL}/districts/${fips}.json`;
  const districtsTopology = await fetchJSON(url);

  return transformDistricts(districtsTopology, statePostalCode, viewSize);
}
