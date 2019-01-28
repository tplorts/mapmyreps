import { GeoPath, geoPath } from 'd3-geo';
import _ from 'lodash';
import { feature, mesh } from 'topojson';
import { ViewSize } from '../types';
import { bboxToXYBoundingBox } from '../utilities';
import { getProjection } from './projectionPlanes';
import { CongressionalDistrictsTopology } from './types';

export default function transformDistricts(
  districtsTopology: CongressionalDistrictsTopology,
  statePostalCode: string,
  mapViewSize: ViewSize
) {
  const projection = getProjection(statePostalCode, mapViewSize);
  const path: GeoPath<any, any> = geoPath(projection);

  const { districts } = districtsTopology.objects;
  const { features } = feature(districtsTopology, districts);

  return {
    borders: path(mesh(districtsTopology, districts)) || '',
    features: _.map(features, districtFeature => ({
      ...districtFeature,
      districtId: _.toNumber(districtFeature.properties.CD115FP),
      path: path(districtFeature) || '',
      boundingBox: bboxToXYBoundingBox(path.bounds(districtFeature)),
    })),
  };
}
