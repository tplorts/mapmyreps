import { UsAtlas } from 'topojson';
import { fetchJSON } from '../../utilities/fetchJSON';
import { NationalAtlasTransformer } from './transformer';
import { NationalAtlas } from './types';

const ATLAS_URL = 'http://data.mapmyreps.us/geography/us-atlas-10m.json';

export async function getNationalAtlas(): Promise<NationalAtlas> {
  const rawAtlas = await fetchJSON<UsAtlas>(ATLAS_URL);

  const transformer = new NationalAtlasTransformer(rawAtlas);

  return {
    features: transformer.getStateFeatures(),
    borders: transformer.getStateBordersPathString(),
    size: transformer.getSize(),
    offset: transformer.getOffset(),
  };
}
