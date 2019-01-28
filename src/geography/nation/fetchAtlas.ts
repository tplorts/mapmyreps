import { UsAtlas } from 'topojson';
import { fetchJSON } from '../../utilities/fetchJSON';
import { GEOGRAPHY_DATA_URL } from '../constants';
import { NationalAtlas } from '../types';
import { NationalAtlasTransformer } from './transformer';

const ATLAS_URL = `${GEOGRAPHY_DATA_URL}/us-atlas-10m.json`;

export default async function fetchNationalAtlas(): Promise<NationalAtlas> {
  const rawAtlas = await fetchJSON<UsAtlas>(ATLAS_URL);

  const transformer = new NationalAtlasTransformer(rawAtlas);

  return {
    features: transformer.getStateFeatures(),
    borders: transformer.getStateBordersPathString(),
    size: transformer.getSize(),
    offset: transformer.getOffset(),
  };
}
